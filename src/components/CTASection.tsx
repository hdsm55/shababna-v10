import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function CTASection() {
  const { t } = useTranslation()

  return (
    <section className="section-wrapper bg-primary-600">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t('cta.heading')}
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto mb-8">
            {t('cta.subheading')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/volunteer"
              className="btn-primary bg-white text-primary-600 hover:bg-gray-100"
            >
              {t('cta.volunteer')}
            </Link>
            <Link
              to="/contact"
              className="btn-secondary border-white text-white hover:bg-white/10"
            >
              {t('cta.contact')}
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
