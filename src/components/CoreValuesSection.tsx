import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Users, Globe, Zap, Heart } from 'lucide-react'

type ValueItem = {
  key: 'leadership' | 'community' | 'innovation' | 'impact'
  icon: React.ElementType
  iconColor: string
  bgColor: string
}

const values: ValueItem[] = [
  {
    key: 'leadership',
    icon: Users,
    iconColor: 'text-primary-400',
    bgColor: 'bg-primary-500/10',
  },
  {
    key: 'community',
    icon: Heart,
    iconColor: 'text-secondary-400',
    bgColor: 'bg-secondary-500/10',
  },
  {
    key: 'innovation',
    icon: Zap,
    iconColor: 'text-accent-400',
    bgColor: 'bg-accent-500/10',
  },
  {
    key: 'impact',
    icon: Globe,
    iconColor: 'text-primary-400',
    bgColor: 'bg-primary-500/10',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

export default function CoreValuesSection() {
  const { t } = useTranslation()

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/50 via-white to-gray-50/30" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-primary-50 rounded-full px-4 py-2 mb-4 text-sm text-primary-600 font-almarai font-medium">
            <div className="w-2 h-2 bg-primary-400 rounded-full animate-pulse"></div>
            قيمنا الأساسية
          </div>

          <h2 className="text-3xl md:text-4xl font-tajawal font-bold text-gray-900 mb-4">
            {t('values.title')}
          </h2>
          <p className="text-lg font-almarai text-gray-600 max-w-2xl mx-auto">
            {t('values.subtitle')}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {values.map((item) => {
            const Icon = item.icon
            return (
              <motion.div
                key={item.key}
                variants={itemVariants}
                whileHover={{
                  y: -5,
                  transition: { type: 'spring', stiffness: 300, damping: 20 },
                }}
                className={`group relative ${item.bgColor} rounded-xl p-6 text-center transition-all duration-300 hover:shadow-lg border border-gray-100 hover:border-gray-200`}
              >
                <div
                  className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${item.bgColor} mb-4 group-hover:scale-110 transition-transform duration-300`}
                >
                  <Icon className={`w-6 h-6 ${item.iconColor}`} />
                </div>

                <h3 className="text-lg font-tajawal font-semibold text-gray-900 mb-2">
                  {t(`values.${item.key}.title`)}
                </h3>
                <p className="text-sm font-almarai text-gray-600 leading-relaxed">
                  {t(`values.${item.key}.description`)}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
