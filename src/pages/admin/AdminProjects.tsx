import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  useProjects, 
  useAddProject, 
  useDeleteProject 
} from '../../hooks/useProjects'
import { FolderPlus, Trash2, Edit, Loader } from 'lucide-react'

export default function AdminProjects() {
  const navigate = useNavigate()
  const { data: projects = [], isLoading, error } = useProjects()
  const addProject = useAddProject()
  const deleteProject = useDeleteProject()
  const [newProjectTitle, setNewProjectTitle] = useState('')
  const [isAdding, setIsAdding] = useState(false)

  const handleAddProject = async () => {
    if (!newProjectTitle.trim()) return
    
    setIsAdding(true)
    try {
      await addProject.mutateAsync({ 
        title: newProjectTitle,
        description: 'Project description',
        status: 'draft'
      })
      setNewProjectTitle('')
    } catch (err) {
      console.error('Error adding project:', err)
    } finally {
      setIsAdding(false)
    }
  }

  const handleDeleteProject = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await deleteProject.mutateAsync(id)
      } catch (err) {
        console.error('Error deleting project:', err)
      }
    }
  }

  if (isLoading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-primary" />
    </div>
  )

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-red-600 text-center">
        <p className="text-xl font-bold mb-2">Error loading projects</p>
        <p>{String(error)}</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">إدارة المشاريع</h1>
          <button 
            onClick={() => navigate('/admin/projects/add')}
            className="bg-primary text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors"
          >
            <FolderPlus className="w-5 h-5" />
            إضافة مشروع جديد
          </button>
        </div>

        {/* Quick Add Form */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">إضافة مشروع سريع</h2>
          <div className="flex gap-4">
            <input
              type="text"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              placeholder="عنوان المشروع"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              onClick={handleAddProject}
              disabled={isAdding || !newProjectTitle.trim()}
              className="bg-primary text-white px-6 py-2 rounded-lg flex items-center gap-2 hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isAdding ? (
                <Loader className="w-5 h-5 animate-spin" />
              ) : (
                <FolderPlus className="w-5 h-5" />
              )}
              إضافة
            </button>
          </div>
        </div>

        {/* Projects List */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-semibold">قائمة المشاريع</h2>
          </div>
          
          {projects.length === 0 ? (
            <div className="p-8 text-center text-gray-500">
              لا توجد مشاريع حالياً. أضف مشروعاً جديداً للبدء.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {projects.map((project) => (
                <li key={project.id} className="p-6 flex justify-between items-center hover:bg-gray-50">
                  <div>
                    <h3 className="font-medium text-gray-900">{project.title}</h3>
                    <p className="text-sm text-gray-500 truncate max-w-md">{project.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => navigate(`/admin/projects/edit/${project.id}`)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  )
}