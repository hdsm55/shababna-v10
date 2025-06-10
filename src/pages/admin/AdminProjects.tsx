import { useState } from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  useProjects,
  useAddProject,
  useDeleteProject,
} from '../../hooks/useProjects'
import { Plus, Trash2 } from 'lucide-react'
import ProtectedRoute from '../../components/ProtectedRoute'

const AdminProjects = () => {
  const { t } = useTranslation()
  const { data: projects, isLoading, error } = useProjects()
  const addProject = useAddProject()
  const deleteProject = useDeleteProject()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredProjects = projects?.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleAddProject = async () => {
    try {
      await addProject.mutateAsync({
        title: 'New Project',
        description: 'Project description',
        category: 'education',
        status: 'draft',
      })
    } catch (error) {
      console.error('Error adding project:', error)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (
      !window.confirm(
        t(
          'projects.confirmDelete',
          'Are you sure you want to delete this project?'
        )
      )
    ) {
      return
    }

    try {
      await deleteProject.mutateAsync(id)
    } catch (error) {
      console.error('Error deleting project:', error)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error instanceof Error) {
    return <div className="text-red-500">{error.message}</div>
  }

  return (
    <ProtectedRoute>
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">
            {t('projects.management', 'إدارة المشاريع')}
          </h1>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary flex items-center gap-2"
            onClick={handleAddProject}
            disabled={addProject.isPending}
          >
            <Plus className="w-5 h-5" />
            {t('projects.addNew', 'إضافة مشروع')}
          </motion.button>
        </div>

        <div className="mb-6">
          <input
            type="text"
            placeholder={t('projects.search', 'بحث...')}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects?.map((project) => (
            <motion.div
              key={project.id}
              className="card-base"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h3 className="text-xl font-bold mb-2">{project.title}</h3>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">
                  {project.category}
                </span>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleDeleteProject(project.id)}
                  disabled={deleteProject.isPending}
                >
                  <Trash2 className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  )
}

export default AdminProjects
