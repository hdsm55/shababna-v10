import { useState, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Filter,
  Search,
  X,
  Calendar,
  ArrowRight,
  ExternalLink,
} from 'lucide-react'
import projectsData from '../data/projects.json'
import Meta from '../components/Meta'
import OptimizedImage from '../components/OptimizedImage'

interface Project {
  id: string
  title: {
    en: string
    ar: string
    tr: string
  }
  description: {
    en: string
    ar: string
    tr: string
  }
  category: string
  status: string
  image: string
  date?: string
}

export default function Projects() {
  const { t, i18n } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedStatus, setSelectedStatus] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [filteredProjects, setFilteredProjects] = useState<Project[]>(
    projectsData.projects as Project[],
  )

  const currentLanguage = i18n.language as keyof Project['title']

  const uniqueCategories = [
    'all',
    ...new Set(projectsData.projects.map((p) => p.category)),
  ]
  const uniqueStatuses = [
    'all',
    ...new Set(projectsData.projects.map((p) => p.status)),
  ]

  const filterProjects = useCallback(() => {
    const filtered = (projectsData.projects as Project[]).filter((project) => {
      const matchesCategory =
        selectedCategory === 'all' || project.category === selectedCategory
      const matchesStatus =
        selectedStatus === 'all' || project.status === selectedStatus
      const matchesSearch =
        searchQuery === '' ||
        project.title[currentLanguage]
          .toLowerCase()
          .includes(searchQuery.toLowerCase()) ||
        project.description[currentLanguage]
          .toLowerCase()
          .includes(searchQuery.toLowerCase())

      return matchesCategory && matchesStatus && matchesSearch
    })
    setFilteredProjects(filtered)
  }, [selectedCategory, selectedStatus, searchQuery, currentLanguage])

  useEffect(() => {
    filterProjects()
  }, [filterProjects])

  const clearFilters = () => {
    setSelectedCategory('all')
    setSelectedStatus('all')
    setSearchQuery('')
  }

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15,
      },
    },
  }
  const cardVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 120,
        damping: 15,
        duration: 0.6,
      },
    },
  }

  return (
    <>
      <Meta
        title={t('projects.title', 'Our Projects')}
        description={t(
          'projects.description',
          'Explore our various youth empowerment projects and initiatives',
        )}
      />
      <section className="min-h-screen py-24 bg-gradient-to-tr from-midnight via-cetacean to-black relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 pointer-events-none select-none">
          <motion.div
            className="absolute top-1/4 right-1/4 w-72 h-72 bg-primary-500/10 rounded-full blur-3xl"
            animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute bottom-1/3 left-1/4 w-56 h-56 bg-accent-500/10 rounded-full blur-3xl"
            animate={{ scale: [1.2, 1, 1.2], opacity: [0.4, 0.6, 0.4] }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 1,
            }}
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90 font-almarai"
            >
              <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
              {t('projects.featured', 'مشاريعنا')}
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="font-tajawal text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
            >
              {t('projects.title', 'Our Projects')}
            </motion.h1>
            <motion.div
              className="mx-auto mb-4 mt-[-12px] h-1 w-32 bg-gradient-to-r from-secondary-400 to-yellow-400 rounded-full"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="font-almarai text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
            >
              {t(
                'projects.subtitle',
                'Discover our initiatives making a difference in communities worldwide',
              )}
            </motion.p>
          </motion.div>

          {/* Filters/Search */}
          <div className="mb-12 flex flex-col md:flex-row gap-4 items-center justify-between bg-white/5 backdrop-blur-md border border-white/10 rounded-xl p-6 shadow-lg">
            <div className="relative w-full md:w-96">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/50 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t(
                  'projects.search_placeholder',
                  'Search projects...',
                )}
                className="input input-bordered w-full pl-10 bg-cetacean/80 text-white border-white/20 placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full font-almarai"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="px-5 py-2 rounded-full bg-gradient-to-r from-secondary-400 to-yellow-400 text-black font-tajawal font-bold shadow hover:from-secondary-500 hover:to-yellow-500 transition-all duration-300 flex items-center gap-2"
              >
                <Filter className="w-5 h-5" />
                {t('projects.filter', 'تصفية')}
              </button>
              {(selectedCategory !== 'all' ||
                selectedStatus !== 'all' ||
                searchQuery) && (
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 rounded-full bg-white/10 text-white font-tajawal font-bold hover:bg-white/20 transition-all duration-300 flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  {t('projects.clear', 'إعادة تعيين')}
                </button>
              )}
            </div>
          </div>
          <AnimatePresence>
            {isFilterOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-10 grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                <div>
                  <label className="label">
                    <span className="label-text text-white/80 font-almarai">
                      {t('projects.category', 'الفئة')}
                    </span>
                  </label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="select select-bordered w-full bg-cetacean/80 text-white border-white/20 rounded-full font-almarai"
                  >
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {t(`projects.categories.${category}`, category)}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="label">
                    <span className="label-text text-white/80 font-almarai">
                      {t('projects.status', 'الحالة')}
                    </span>
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="select select-bordered w-full bg-cetacean/80 text-white border-white/20 rounded-full font-almarai"
                  >
                    {uniqueStatuses.map((status) => (
                      <option key={status} value={status}>
                        {t(`projects.statuses.${status}`, status)}
                      </option>
                    ))}
                  </select>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          >
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                  boxShadow: '0 8px 32px 0 rgba(0,0,0,0.18)',
                }}
                className="group relative cursor-pointer"
                style={{ height: '100%' }}
              >
                <Link to={`/projects/${project.id}`} className="block h-full">
                  <div className="relative bg-white/5 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-500 border border-white/10 hover:border-white/20 hover:shadow-xl group-hover:ring-4 group-hover:ring-secondary-400/20 h-full">
                    {/* Project Image */}
                    <div className="relative h-48 overflow-hidden">
                      <OptimizedImage
                        src={project.image}
                        alt={project.title[currentLanguage]}
                        className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                        quality={80}
                        lazy={true}
                        placeholder={true}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-secondary-400/40 to-transparent opacity-35" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      {/* Status Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-2 border border-white/30 flex items-center gap-2">
                          <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                          <span className="text-xs text-white font-almarai font-bold">
                            {t(
                              `projects.statuses.${project.status}`,
                              project.status,
                            )}
                          </span>
                        </div>
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-4 right-4">
                        <div className="px-3 py-2 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 backdrop-blur-md font-almarai">
                          {t(
                            `projects.categories.${project.category}`,
                            project.category,
                          )}
                        </div>
                      </div>
                      {/* Floating Icon */}
                      <motion.div
                        className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <ExternalLink className="w-7 h-7 text-white" />
                      </motion.div>
                    </div>
                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-tajawal font-semibold text-white mb-3 text-center group-hover:text-secondary-300 transition-colors duration-300">
                        {project.title[currentLanguage]}
                      </h3>
                      {/* Animated accent line */}
                      <motion.div
                        className={`mx-auto mb-4 mt-[-12px] h-1 w-20 bg-gradient-to-r from-secondary-400 to-yellow-400 rounded-full`}
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        transition={{ duration: 0.3 }}
                      />
                      <p className="text-white/80 font-almarai text-center leading-relaxed group-hover:text-white/90 transition-colors duration-300 mb-4 text-sm">
                        {project.description[currentLanguage]}
                      </p>
                      {/* Project Details */}
                      <div className="flex items-center justify-center text-white/60 text-sm mb-4 gap-2">
                        <Calendar className="w-4 h-4" />
                        <span className="font-almarai">
                          {project.date
                            ? new Date(project.date).toLocaleDateString()
                            : 'N/A'}
                        </span>
                      </div>
                      {/* Action Button */}
                      <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-full relative px-4 py-3 rounded-full font-tajawal font-medium text-white text-sm bg-gradient-to-r from-secondary-400 to-yellow-400 opacity-90 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden"
                      >
                        <span className="relative z-10">
                          {t('projects.view_details', 'View Details')}
                        </span>
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </motion.div>
                    </div>
                    {/* Background glow effect */}
                    <div className="absolute inset-0 from-secondary-400/10 to-yellow-400/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
          {filteredProjects.length === 0 && (
            <div className="text-center py-12">
              <p className="text-lg text-white/60 font-almarai">
                {t(
                  'projects.no_results',
                  'No projects found matching your criteria.',
                )}
              </p>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
