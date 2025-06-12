import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
import { logger } from '../utils/logger';

interface Project {
  id: string;
  title: string;
  description: string;
  category?: string;
  status?: string;
  img_url?: string;
  year?: string;
  created_at?: string;
  updated_at?: string;
}

const invalidate = (qc: ReturnType<typeof useQueryClient>) => qc.invalidateQueries({ queryKey: ['projects'] });

// List projects
export const useProjects = () =>
  useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: async () => {
      try {
        // Use relative path for API call
        const response = await fetch('/api/projects');
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        logger.info('Projects fetched successfully', {
          tags: ['projects', 'query'],
          metadata: { count: data?.length || 0 }
        });
        
        return data ?? [];
      } catch (error) {
        logger.error('Failed to fetch projects', {
          tags: ['projects', 'query', 'error'],
          metadata: { error }
        });
        throw error;
      }
    },
  });

// Add project
export const useAddProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (dto: Partial<Project>) => {
      try {
        const response = await fetch('/api/projects', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dto),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        logger.info('Project added successfully', {
          tags: ['projects', 'mutation', 'add'],
          metadata: { projectId: data?.id }
        });
        
        return data;
      } catch (error) {
        logger.error('Failed to add project', {
          tags: ['projects', 'mutation', 'add', 'error'],
          metadata: { error, dto }
        });
        throw error;
      }
    },
    onSuccess: () => invalidate(qc)
  });
};

// Update project
export const useUpdateProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, dto }: { id: string; dto: Partial<Project> }) => {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dto),
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        const data = await response.json();
        
        logger.info('Project updated successfully', {
          tags: ['projects', 'mutation', 'update'],
          metadata: { projectId: id }
        });
        
        return data;
      } catch (error) {
        logger.error('Failed to update project', {
          tags: ['projects', 'mutation', 'update', 'error'],
          metadata: { error, projectId: id, dto }
        });
        throw error;
      }
    },
    onSuccess: () => invalidate(qc)
  });
};

// Delete project
export const useDeleteProject = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: async (id: string) => {
      try {
        const response = await fetch(`/api/projects/${id}`, {
          method: 'DELETE',
        });
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
        }
        
        logger.info('Project deleted successfully', {
          tags: ['projects', 'mutation', 'delete'],
          metadata: { projectId: id }
        });
        
        return id;
      } catch (error) {
        logger.error('Failed to delete project', {
          tags: ['projects', 'mutation', 'delete', 'error'],
          metadata: { error, projectId: id }
        });
        throw error;
      }
    },
    onSuccess: () => invalidate(qc)
  });
};