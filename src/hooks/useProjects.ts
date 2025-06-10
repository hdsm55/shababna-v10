import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-toastify';

interface Project {
  id: number;
  title: string;
  description: string;
  cover: {
    url: string;
    alternativeText: string;
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

interface CreateProjectInput {
  title: string;
  description: string;
  cover: File;
}

interface UpdateProjectInput extends Partial<CreateProjectInput> {
  id: number;
}

interface StrapiResponse<T> {
  data: {
    id: number;
    attributes: T;
  };
}

interface StrapiProjectAttributes {
  title: string;
  description: string;
  cover?: {
    data?: {
      attributes?: {
        url: string;
        alternativeText: string;
      };
  };
  };
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:1337';

// Validation functions
const validateProject = (input: CreateProjectInput): string[] => {
  const errors: string[] = [];
  if (!input.title.trim()) errors.push('Title is required');
  if (!input.description.trim()) errors.push('Description is required');
  if (!input.cover) errors.push('Cover image is required');
  return errors;
};

// Transform functions
const transformProject = (project: StrapiResponse<StrapiProjectAttributes>): Project => ({
  id: project.data.id,
  title: project.data.attributes.title,
  description: project.data.attributes.description,
  cover: {
    url: project.data.attributes.cover?.data?.attributes?.url || '',
    alternativeText: project.data.attributes.cover?.data?.attributes?.alternativeText || '',
  },
  createdAt: project.data.attributes.createdAt,
  updatedAt: project.data.attributes.updatedAt,
  publishedAt: project.data.attributes.publishedAt,
});

const projectsApi = {
  getAll: async (): Promise<Project[]> => {
    const { data } = await axios.get<{ data: StrapiResponse<StrapiProjectAttributes>[] }>(`${API_URL}/api/projects?populate=*`);
    return data.data.map(transformProject);
  },

  getOne: async (id: number): Promise<Project> => {
    const { data } = await axios.get<{ data: StrapiResponse<StrapiProjectAttributes> }>(`${API_URL}/api/projects/${id}?populate=*`);
    return transformProject(data.data);
  },

  create: async (input: CreateProjectInput): Promise<Project> => {
    const errors = validateProject(input);
    if (errors.length > 0) {
      throw new Error(errors.join(', '));
    }

    const formData = new FormData();
    formData.append('data', JSON.stringify({
      title: input.title,
      description: input.description,
    }));
    formData.append('files.cover', input.cover);

    const { data } = await axios.post<{ data: StrapiResponse<StrapiProjectAttributes> }>(`${API_URL}/api/projects`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return transformProject(data.data);
  },

  update: async ({ id, ...input }: UpdateProjectInput): Promise<Project> => {
    const formData = new FormData();
    formData.append('data', JSON.stringify(input));
    if (input.cover) {
      formData.append('files.cover', input.cover);
    }

    const { data } = await axios.put<{ data: StrapiResponse<StrapiProjectAttributes> }>(`${API_URL}/api/projects/${id}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return transformProject(data.data);
  },

  delete: async (id: number): Promise<void> => {
    await axios.delete(`${API_URL}/api/projects/${id}`);
  },
};

export function useProjects() {
  const queryClient = useQueryClient();

  const {
    data: projects = [],
    isLoading,
    error,
  } = useQuery<Project[], Error>({
    queryKey: ['projects'],
    queryFn: projectsApi.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  const createProject = useMutation({
    mutationFn: projectsApi.create,
    onMutate: async (newProject) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previousProjects = queryClient.getQueryData<Project[]>(['projects']);

      const optimisticProject: Project = {
        id: Date.now(),
        title: newProject.title,
        description: newProject.description,
        cover: {
          url: URL.createObjectURL(newProject.cover),
          alternativeText: newProject.title,
        },
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        publishedAt: new Date().toISOString(),
      };

      queryClient.setQueryData<Project[]>(['projects'], (old = []) => [...old, optimisticProject]);

      return { previousProjects };
    },
    onError: (err, newProject, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects);
      }
      toast.error(`Failed to create project "${newProject.title}": ${err instanceof Error ? err.message : 'Unknown error'}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project created successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const updateProject = useMutation({
    mutationFn: projectsApi.update,
    onMutate: async (updatedProject) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previousProjects = queryClient.getQueryData<Project[]>(['projects']);

      queryClient.setQueryData<Project[]>(['projects'], (old = []) =>
        old.map((project) =>
          project.id === updatedProject.id
            ? {
                ...project,
                ...updatedProject,
                cover: updatedProject.cover
                  ? {
                      url: URL.createObjectURL(updatedProject.cover),
                      alternativeText: project.title,
                    }
                  : project.cover,
              }
            : project
        )
      );

      return { previousProjects };
    },
    onError: (err, updatedProject, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects);
      }
      toast.error(`Failed to update project #${updatedProject.id}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project updated successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  const deleteProject = useMutation({
    mutationFn: projectsApi.delete,
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['projects'] });
      const previousProjects = queryClient.getQueryData<Project[]>(['projects']);

      queryClient.setQueryData<Project[]>(['projects'], (old = []) =>
        old.filter((project) => project.id !== id)
      );

      return { previousProjects };
    },
    onError: (err, id, context) => {
      if (context?.previousProjects) {
        queryClient.setQueryData(['projects'], context.previousProjects);
      }
      toast.error(`Failed to delete project #${id}: ${err instanceof Error ? err.message : 'Unknown error'}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      toast.success('Project deleted successfully');
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projects,
    isLoading,
    error,
    createProject: createProject.mutate,
    updateProject: updateProject.mutate,
    deleteProject: deleteProject.mutate,
    isCreating: createProject.isPending,
    isUpdating: updateProject.isPending,
    isDeleting: deleteProject.isPending,
    createError: createProject.error,
    updateError: updateProject.error,
    deleteError: deleteProject.error,
  };
}

// Single project hook with optimistic updates
export function useProject(id: string) {
  return useQuery({
    queryKey: ['projects', id],
    queryFn: () => projectsApi.getOne(Number(id)),
    enabled: !!id,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
}