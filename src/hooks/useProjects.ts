import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: 'draft' | 'published';
  image?: string;
  created_at: string;
  updated_at: string;
}

// List projects
export const useProjects = () =>
  useQuery<Project[]>({
    queryKey: ['projects'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      return data;
    }
  });

const invalidate = (qc: ReturnType<typeof useQueryClient>) =>
  qc.invalidateQueries({ queryKey: ['projects'] });

// Add project
export const useAddProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (dto: Partial<Project>) => {
      const { data, error } = await supabase
        .from('projects')
        .insert([dto])
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => invalidate(qc)
  });
};

// Update project
export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: Partial<Project> }) => {
      const { data, error } = await supabase
        .from('projects')
        .update(dto)
        .eq('id', id)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => invalidate(qc)
  });
};

// Delete project
export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);
      if (error) throw error;
      return id;
    },
    onSuccess: () => invalidate(qc)
  });
};