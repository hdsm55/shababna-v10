// FILE: src/components/ProjectsSection.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useProjects } from '../hooks/useProjects'
import { Link } from 'react-router-dom'

export const ProjectsSection = () => {
  const { t } = useTranslation()
  const { data: projects = [], isLoading, error } = useProjects()

  // Diagnostic logging
  projects.forEach((p) => console.log('✔️ project item', p.id, p.title))

  if (isLoading) return <div>Loading...</div>
  if (error) return <div className="text-red-500">{error.message}</div>

  return (
    <section className="py-16 bg-base-100">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {t('projects.heading')}
          </motion.h2>
          <motion.p
            className="text-lg text-gray-600 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {t('projects.subheading')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((p, index) => (
            <div key={p.id ?? p.title ?? String(index)} className="card-base">
              <h3 className="font-semibold">{p.title}</h3>
              <p className="text-sm">{p.description}</p>
              <Link
                to={p.id ? `/projects/${p.id}` : '#'}
                className="btn-primary mt-4 inline-block"
              >
                {t('projects.learnMore')}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
