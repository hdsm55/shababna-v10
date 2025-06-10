// FILE: src/components/ProjectsSection.tsx
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import {
  Monitor,
  Heart,
  Recycle,
  Users,
  Brain,
  Leaf,
  ArrowRight,
  Calendar,
} from 'lucide-react'

export default function ProjectsSection() {
  const { t } = useTranslation()

  const projects = [
    {
      id: 'dtp-2024',
      icon: Monitor,
      image:
        'https://images.pexels.com/photos/3184325/pexels-photo-3184325.jpeg',
      color: 'from-cyan-400 to-blue-500',
      bgColor: 'bg-cyan-500/10',
      year: '2024',
      status: 'جاري التنفيذ',
      category: 'تكنولوجيا',
    },
    {
      id: 'mhp-2024',
      icon: Heart,
      image:
        'https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg',
      color: 'from-pink-400 to-rose-500',
      bgColor: 'bg-pink-500/10',
      year: '2024',
      status: 'نشط',
      category: 'صحة',
    },
    {
      id: 'rec-2023',
      icon: Recycle,
      image:
        'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
      color: 'from-emerald-400 to-green-500',
      bgColor: 'bg-emerald-500/10',
      year: '2023',
      status: 'مكتمل',
      category: 'بيئة',
    },
    {
      id: 'yla-2024',
      icon: Users,
      image:
        'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg',
      color: 'from-violet-400 to-purple-500',
      bgColor: 'bg-violet-500/10',
      year: '2024',
      status: 'جاري التسجيل',
      category: 'قيادة',
    },
    {
      id: 'chi-2024',
      icon: Brain,
      image:
        'https://images.pexels.com/photos/3184357/pexels-photo-3184357.jpeg',
      color: 'from-teal-400 to-cyan-500',
      bgColor: 'bg-teal-500/10',
      year: '2024',
      status: 'قادم قريباً',
      category: 'صحة نفسية',
    },
    {
      id: 'gsp-2023',
      icon: Leaf,
      image:
        'https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg',
      color: 'from-secondary-400 to-yellow-500',
      bgColor: 'bg-secondary-500/10',
      year: '2023',
      status: 'مكتمل',
      category: 'استدامة',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 40,
      scale: 0.95,
    },
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
    <section className="py-24 bg-gradient-to-bl from-midnight via-cetacean to-black relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/3 right-1/4 w-72 h-72 bg-accent-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-1/3 w-56 h-56 bg-violet-500/3 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90 font-almarai"
          >
            <div className="w-2 h-2 bg-secondary-400 rounded-full animate-pulse"></div>
            مشاريعنا المميزة
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-tajawal text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6"
          >
            {t('projects.heading')}
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="font-almarai text-lg md:text-xl text-white/80 max-w-3xl mx-auto leading-relaxed"
          >
            {t('projects.subheading')}
          </motion.p>
        </motion.div>

        {/* Projects Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {projects.map((project) => {
            const Icon = project.icon
            return (
              <motion.div
                key={project.id}
                variants={cardVariants}
                whileHover={{
                  y: -15,
                  scale: 1.02,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className="group relative cursor-pointer"
              >
                {/* Main Card */}
                <div className="relative bg-white/5 backdrop-blur-md rounded-2xl shadow-lg overflow-hidden transition-all duration-500 border border-white/10 hover:border-white/20 hover:shadow-xl group-hover:ring-4 group-hover:ring-secondary-400/20">
                  {/* Project Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={t(`projects.${project.id}.title`)}
                      className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
                    />
                    <div
                      className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-35`}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    {/* Status Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-white/20 backdrop-blur-md rounded-full px-3 py-2 border border-white/30 flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-current animate-pulse" />
                        <span className="text-xs text-white font-almarai font-bold">
                          {project.status}
                        </span>
                      </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 right-4">
                      <div className="px-3 py-2 rounded-full text-xs font-medium bg-white/20 text-white border border-white/30 backdrop-blur-md font-almarai">
                        {project.category}
                      </div>
                    </div>

                    {/* Floating Icon */}
                    <motion.div
                      className="absolute bottom-4 right-4 p-3 bg-white/20 backdrop-blur-md rounded-full shadow-lg"
                      whileHover={{ scale: 1.1, rotate: 10 }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <Icon className="w-7 h-7 text-white" />
                    </motion.div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-tajawal font-semibold text-white mb-3 text-center group-hover:text-secondary-300 transition-colors duration-300">
                      {t(`projects.${project.id}.title`)}
                    </h3>
                    {/* Animated accent line */}
                    <motion.div
                      className={`mx-auto mb-4 mt-[-12px] h-1 w-24 bg-gradient-to-r ${project.color} rounded-full`}
                      initial={{ scaleX: 0 }}
                      whileHover={{ scaleX: 1 }}
                      transition={{ duration: 0.3 }}
                    />
                    <p className="text-white/80 font-almarai text-center leading-relaxed group-hover:text-white/90 transition-colors duration-300 mb-4 text-sm">
                      {t(`projects.${project.id}.description`)}
                    </p>
                    {/* Project Details */}
                    <div className="flex items-center justify-center text-white/60 text-sm mb-4 gap-2">
                      <Calendar className="w-4 h-4" />
                      <span className="font-almarai">{project.year}</span>
                    </div>
                    {/* Action Button */}
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className={`w-full relative px-4 py-3 rounded-full font-tajawal font-medium text-white text-sm bg-gradient-to-r ${project.color} opacity-90 group-hover:opacity-100 transition-all duration-300 hover:shadow-lg flex items-center justify-center gap-2 overflow-hidden`}
                    >
                      <span className="relative z-10">
                        {t('projects.learnMore')}
                      </span>
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.button>
                  </div>
                  {/* Background glow effect */}
                  <div
                    className={`absolute inset-0 ${project.bgColor} opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />
                </div>
              </motion.div>
            )
          })}
        </motion.div>

        {/* View All Projects Button */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 1 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{
              scale: 1.05,
              boxShadow: '0 20px 25px -5px rgba(242, 201, 76, 0.4)',
            }}
            whileTap={{ scale: 0.95 }}
            className="bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-tajawal font-bold px-10 py-4 rounded-full shadow-xl transition-all duration-300 group"
          >
            <span className="flex items-center gap-3">
              عرض جميع المشاريع
              <motion.div
                animate={{ x: [0, 3, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.div>
            </span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
