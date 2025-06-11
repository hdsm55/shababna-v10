import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from './ProjectCard'

export default function ProjectsSection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'
  const { data: projects = [], isLoading, error } = useProjects()

  // Limit to 3 projects for the homepage
  const featuredProjects = projects.slice(0, 3)

  if (isLoading) return (
    <section className="section bg-white">
      <div className="container mx-auto text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </div>
    </section>
  )
  
  if (error) return (
    <section className="section bg-white">
      <div className="container mx-auto text-center py-12">
        <p className="text-red-600">{String(error)}</p>
      </div>
    </section>
  )

  return (
    <section className="section bg-white">
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {featuredProjects.map((project, index) => (
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

        <div className="text-center">
          <Link to="/projects">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary rounded-xl font-medium hover:bg-primary/5 transition-all duration-300"
            >
              {t('projects.viewAll', 'View All Projects')}
              <ArrowRight className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${isRTL ? 'rotate-180' : ''}`} />
            </motion.button>
          </Link>
        </div>
      </div>
    </section>
  )
}