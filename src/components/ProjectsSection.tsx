// FILE: src/components/ProjectsSection.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useProjects } from '../hooks/useProjects'
import { Link } from 'react-router-dom'

export default function ProjectsSection() {
  const { t } = useTranslation()
  const { data: projects = [], isLoading, error } = useProjects()

  // Diagnostic logging
  projects.forEach((p) =>
    console.log('🕵️‍♂️ project', {
      id: p.id,
      uuid: p.uuid,
      title: p.title,
    })
  )

  if (isLoading) return <p className="section-wrapper">Loading…</p>
  if (error)
    return <p className="section-wrapper text-red-600">{String(error)}</p>

  return (
    <section className="section-wrapper bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('projects.heading')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('projects.subheading')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <motion.div
              key={p.id ?? p.uuid ?? String(index)}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-600 mb-4">{p.description}</p>
                <Link
                  to={`/projects/${p.id ?? p.uuid}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700"
                >
                  {t('projects.learnMore')}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
