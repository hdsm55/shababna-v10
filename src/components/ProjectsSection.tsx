import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useProjects } from '../hooks/useProjects'
import { Link } from 'react-router-dom'

export default function ProjectsSection() {
  const { t } = useTranslation()
  const { data: projects = [], isLoading, error } = useProjects()

  if (isLoading) return <p className="section-wrapper">Loading…</p>
  if (error)
    return <p className="section-wrapper text-red-600">{String(error)}</p>

  return (
    <section className="section">
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
          {projects.map((p, idx) => (
            <motion.div
              key={p.id ?? idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="card"
            >
              {p.img_url && (
                <div className="h-48 overflow-hidden">
                  <img 
                    src={p.img_url} 
                    alt={p.title} 
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {p.title}
                </h3>
                <p className="text-gray-600 mb-4">{p.description}</p>
                {p.year && (
                  <div className="text-sm text-gray-500 mb-4">
                    {p.year}
                  </div>
                )}
                <Link
                  to={p.id ? `/projects/${p.id}` : '#'}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700"
                >
                  {t('projects.learnMore')}
                  <svg
                    className="w-4 h-4 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
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