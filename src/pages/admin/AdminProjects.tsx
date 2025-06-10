import ProtectedRoute from '../../components/ProtectedRoute'
import {
  useProjects,
  useAddProject,
  useDeleteProject,
} from '../../hooks/useProjects'

export default function AdminProjects() {
  const { data: projects, isLoading, error } = useProjects()
  const addProject = useAddProject()
  const deleteProject = useDeleteProject()

  const handleAdd = () => {
    addProject.mutate({
      title: 'مشروع جديد',
      description: 'وصف المشروع',
    })
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-10">
        <div className="max-w-2xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-primary">إدارة المشاريع</h1>
            <button
              className="btn-primary"
              onClick={handleAdd}
              disabled={addProject.isPending}
            >
              إضافة مشروع
            </button>
          </div>
          {isLoading && <div>جاري التحميل...</div>}
          {error && <div className="text-red-500">{error.message}</div>}
          <div className="space-y-4">
            {projects && projects.length === 0 && <div>لا توجد مشاريع.</div>}
            {projects &&
              projects.map((project) => (
                <div
                  key={project.id}
                  className="card-base flex justify-between items-center"
                >
                  <div>
                    <div className="font-bold text-lg">{project.title}</div>
                    <div className="text-gray-600 text-sm">
                      {project.description}
                    </div>
                  </div>
                  <button
                    className="btn-primary bg-red-600 hover:bg-red-700 ml-4"
                    onClick={() => deleteProject.mutate(project.id)}
                    disabled={deleteProject.isPending}
                  >
                    حذف
                  </button>
                </div>
              ))}
          </div>
        </div>
      </div>
    </ProtectedRoute>
  )
}
