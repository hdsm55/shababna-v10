import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { ArrowLeft, Users, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function CTASection() {
  const { t } = useTranslation()

  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0">
        <motion.div
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"
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
          className="absolute bottom-1/3 left-1/4 w-48 h-48 bg-secondary-400/10 rounded-full blur-3xl"
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

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-tajawal font-bold text-white mb-4">
            {t('cta.title')}
          </h2>
          <p className="text-lg md:text-xl font-almarai text-white/90 max-w-2xl mx-auto leading-relaxed">
            {t('cta.subtitle')}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <Link
            to="/projects"
            className="group inline-flex items-center gap-3 bg-white text-primary-600 px-8 py-4 rounded-xl font-almarai font-semibold transition-all duration-300 hover:bg-gray-50 hover:shadow-lg hover:scale-105"
          >
            <Users className="w-5 h-5" />
            {t('cta.joinButton')}
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform duration-300" />
          </Link>

          <Link
            to="/contact"
            className="group inline-flex items-center gap-3 bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-almarai font-semibold transition-all duration-300 hover:bg-white hover:text-primary-600"
          >
            <MessageCircle className="w-5 h-5" />
            {t('cta.contactButton')}
          </Link>
        </motion.div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 pt-16 border-t border-white/20"
        >
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-tajawal font-bold text-white mb-2">
              500+
            </div>
            <div className="text-white/80 font-almarai">
              {t('stats.members')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-tajawal font-bold text-white mb-2">
              50+
            </div>
            <div className="text-white/80 font-almarai">
              {t('stats.projects')}
            </div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-tajawal font-bold text-white mb-2">
              10+
            </div>
            <div className="text-white/80 font-almarai">{t('stats.years')}</div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
