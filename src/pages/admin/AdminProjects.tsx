import {
  useProjects,
  useAddProject,
  useDeleteProject,
} from '../../hooks/useProjects'

export default function AdminProjects() {
  const { data: projects = [], isLoading, error } = useProjects()
  const add = useAddProject()
  const del = useDeleteProject()

  // Diagnostic logging
  projects.forEach((p) => console.log('🔍 id:', p.id, 'title:', p.title))

  if (isLoading) return <p className="section-wrapper">Loading…</p>
  if (error)
    return <p className="section-wrapper text-red-600">{String(error)}</p>

  return (
    <div className="section-wrapper">
      <h1 className="text-2xl font-semibold mb-4">إدارة المشاريع</h1>
      <button
        className="btn-primary mb-6"
        onClick={() => add.mutate({ title: 'مشروع جديد', description: 'وصف' })}
      >
        إضافة مشروع
      </button>

      <ul className="space-y-2">
        {projects.map((p, index) => (
          <li
            key={p.id ?? p.title ?? String(index)}
            className="card-base flex justify-between items-center"
          >
            <span>{p.title}</span>
            <button onClick={() => del.mutate(p.id)} className="btn-secondary">
              حذف
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
