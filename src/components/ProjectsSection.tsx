import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { useProjects } from '../hooks/useProjects'
import ProjectCard from './ProjectCard'
import { Section } from './ui/Section'
import { Container } from './ui/Container'
import { Heading, Text } from './ui/Typography'
import { Button } from './ui/Button'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ProjectsSection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'
  const { data: projects = [], isLoading, error } = useProjects()

  // Limit to 3 projects for the homepage
  const featuredProjects = projects.slice(0, 3)

  if (isLoading) return (
    <Section>
      <Container className="text-center py-12">
        <div className="inline-block w-8 h-8 border-4 border-accent border-t-transparent rounded-full animate-spin"></div>
      </Container>
    </Section>
  )
  
  if (error) return (
    <Section>
      <Container className="text-center py-12">
        <Text color="accent" className="text-red-600">{String(error)}</Text>
      </Container>
    </Section>
  )

  return (
    <Section background="white">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Heading level={2} align="center" className="mb-4">
            {t('sections.projects.title')}
          </Heading>
          <Text align="center" color="muted" className="max-w-2xl mx-auto">
            {t('sections.projects.subtitle')}
          </Text>
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
            <Button 
              variant="outline" 
              rightIcon={
                <ArrowRight className={`${isRTL ? 'rotate-180' : ''}`} />
              }
              className="border-primary text-primary hover:bg-primary-50"
            >
              {t('projects.viewAll', 'View All Projects')}
            </Button>
          </Link>
        </div>
      </Container>
    </Section>
  )
}