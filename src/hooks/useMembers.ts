import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { logger } from '../utils/logger';
import type { Member, CreateMemberDTO, UpdateMemberDTO, MemberStatus } from '../types/member';

// Fetch all members
export const useMembers = (options?: { 
  status?: MemberStatus, 
  search?: string,
  limit?: number,
  page?: number
}) => {
  const { status, search, limit = 10, page = 1 } = options || {};
  
  return useQuery({
    queryKey: ['members', { status, search, limit, page }],
    queryFn: async () => {
      try {
        let query = supabase
          .from('members')
          .select('*', { count: 'exact' });
        
        // Apply filters if provided
        if (status) {
          query = query.eq('status', status);
        }
        
        if (search) {
          query = query.or(`name.ilike.%${search}%,email.ilike.%${search}%`);
        }
        
        // Apply pagination
        const from = (page - 1) * limit;
        const to = from + limit - 1;
        
        const { data, error, count } = await query
          .order('created_at', { ascending: false })
          .range(from, to);
          
        if (error) throw error;
        
        logger.info('Members fetched successfully', {
          tags: ['members', 'query'],
          metadata: { count: count || 0, filters: { status, search } }
        });
        
        return { 
          data: data as Member[],
          count: count || 0,
          page,
          limit,
          totalPages: count ? Math.ceil(count / limit) : 0
        };
      } catch (error) {
        logger.error('Failed to fetch members', {
          tags: ['members', 'query', 'error'],
          metadata: { error }
        });
        throw error;
      }
    },
  });
};

// Get a single member by ID
export const useMember = (id: string) => {
  return useQuery({
    queryKey: ['members', id],
    queryFn: async () => {
      try {
        const { data, error } = await supabase
          .from('members')
          .select('*')
          .eq('id', id)
          .single();
          
        if (error) throw error;
        
        logger.info('Member fetched successfully', {
          tags: ['members', 'query'],
          metadata: { memberId: id }
        });
        
        return data as Member;
      } catch (error) {
        logger.error('Failed to fetch member', {
          tags: ['members', 'query', 'error'],
          metadata: { memberId: id, error }
        });
        throw error;
      }
    },
    enabled: !!id,
  });
};

// Create a new member
export const useCreateMember = () => {
  return useMutation({
    mutationFn: async (data: CreateMemberDTO) => {
      try {
        const { data: member, error } = await supabase
          .from('members')
          .insert([data])
          .select()
          .single();
          
        if (error) throw error;
        
        logger.info('Member created successfully', {
          tags: ['members', 'mutation', 'create'],
          metadata: { memberId: member.id }
        });
        
        return member as Member;
      } catch (error) {
        logger.error('Failed to create member', {
          tags: ['members', 'mutation', 'create', 'error'],
          metadata: { error, data }
        });
        throw error;
      }
    }
  });
};

// Update a member
export const useUpdateMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ id, data }: { id: string; data: UpdateMemberDTO }) => {
      try {
        const { data: updatedMember, error } = await supabase
          .from('members')
          .update(data)
          .eq('id', id)
          .select()
          .single();
          
        if (error) throw error;
        
        logger.info('Member updated successfully', {
          tags: ['members', 'mutation', 'update'],
          metadata: { memberId: id, updates: data }
        });
        
        return updatedMember as Member;
      } catch (error) {
        logger.error('Failed to update member', {
          tags: ['members', 'mutation', 'update', 'error'],
          metadata: { memberId: id, data, error }
        });
        throw error;
      }
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
      queryClient.invalidateQueries({ queryKey: ['members', data.id] });
    }
  });
};

// Delete a member
export const useDeleteMember = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const { error } = await supabase
          .from('members')
          .delete()
          .eq('id', id);
          
        if (error) throw error;
        
        logger.info('Member deleted successfully', {
          tags: ['members', 'mutation', 'delete'],
          metadata: { memberId: id }
        });
        
        return id;
      } catch (error) {
        logger.error('Failed to delete member', {
          tags: ['members', 'mutation', 'delete', 'error'],
          metadata: { memberId: id, error }
        });
        throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['members'] });
    }
  });
};

// Update member status
export const useUpdateMemberStatus = () => {
  const updateMember = useUpdateMember();
  
  return useMutation({
    mutationFn: async ({ id, status }: { id: string; status: MemberStatus }) => {
      return updateMember.mutateAsync({ id, data: { status } });
    }
  });
};