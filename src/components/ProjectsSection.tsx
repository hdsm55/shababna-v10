// FILE: src/components/ProjectsSection.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'
import { useProjects } from '../hooks/useProjects'

const ProjectsSection = () => {
  const { t } = useTranslation()
  const { data: projects, isLoading, error } = useProjects()

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (error instanceof Error) {
    return <div className="text-red-500">{error.message}</div>
  }

  return (
    <section className="section-wrapper">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-3xl font-bold mb-4"
          >
            {t('projects.heading')}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-gray-600 max-w-2xl mx-auto"
          >
            {t('projects.subheading')}
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects?.map((project) => (
            <motion.div
              key={project.id}
              className="card-base group relative overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative h-48 mb-4 overflow-hidden rounded-lg">
                <img
                  src={
                    project.image ||
                    'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg'
                  }
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent opacity-35" />
              </div>

              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                  {project.status}
                </span>
                <span className="px-3 py-1 text-sm rounded-full bg-primary/10 text-primary">
                  {project.category}
                </span>
              </div>

              <motion.div
                className="relative z-10"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                <motion.div className="mx-auto mb-4 mt-[-12px] h-1 w-24 bg-gradient-to-r from-primary to-primary/50 rounded-full" />
                <p className="text-gray-600 mb-4">{project.description}</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span className="font-almarai">
                    {new Date(project.created_at).getFullYear()}
                  </span>
                </div>
                <motion.button className="w-full relative px-4 py-3 rounded-full font-tajawal font-medium text-white text-sm bg-gradient-to-r from-primary to-primary/90 opacity-90 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden">
                  {t('projects.learnMore')}
                  <ArrowRight className="w-4 h-4" />
                </motion.button>
              </motion.div>

              <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
