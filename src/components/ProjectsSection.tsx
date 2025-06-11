import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  const { t } = useTranslation()
  const { data: projects = [], isLoading, error } = useProjects()

  if (isLoading) return (
    <section className="section">
      <div className="container mx-auto text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    </section>
  )
  
  if (error) return (
    <section className="section">
      <div className="container mx-auto text-center py-12">
        <p className="text-red-600">{String(error)}</p>
      </div>
    </section>
  )

  return (
    <section className="section bg-gray-50">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('sections.projects.title')}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {t('sections.projects.subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.id ?? index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                imageUrl={project.img_url}
                year={project.year}
                category={project.category}
                status={project.status}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}