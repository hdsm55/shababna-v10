// FILE: src/components/StatsSection.tsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Users, Globe, Zap, Award } from 'lucide-react'

const stats = [
  {
    key: 'volunteers',
    icon: Users,
    value: '500+',
    color: 'text-primary-400',
    bgColor: 'bg-primary-500/10',
  },
  {
    key: 'countries',
    icon: Globe,
    value: '15+',
    color: 'text-secondary-400',
    bgColor: 'bg-secondary-500/10',
  },
  {
    key: 'projects',
    icon: Zap,
    value: '50+',
    color: 'text-accent-400',
    bgColor: 'bg-accent-500/10',
  },
  {
    key: 'awards',
    icon: Award,
    value: '10+',
    color: 'text-primary-400',
    bgColor: 'bg-primary-500/10',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
    },
  },
}

export default function StatsSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-gray-50 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-gray-900 mb-4">
            {t('stats.heading')}
          </h2>
          <p className="text-lg font-almarai text-gray-600 max-w-2xl mx-auto">
            {t('stats.subheading')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <motion.div
                key={stat.key}
                variants={itemVariants}
                whileHover={{ y: -5 }}
                className={`group ${stat.bgColor} rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg border border-gray-100`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${stat.bgColor} mb-4 group-hover:scale-105 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${stat.color}`} />
                </div>

                <h3 className="text-3xl md:text-4xl font-tajawal font-bold text-gray-900 mb-2">
                  {stat.value}
                </h3>

                <p className="text-sm font-almarai text-gray-600 font-medium">
                  {t(`stats.${stat.key}`)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
