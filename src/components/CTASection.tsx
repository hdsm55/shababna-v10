import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Section } from './ui/Section'
import { Container } from './ui/Container'
import { Heading, Text } from './ui/Typography'
import { Button } from './ui/Button'

export default function CTASection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  return (
    <Section background="primary" className="relative overflow-hidden">
      <span
        className="absolute inset-0 bg-gradient-to-b from-primary to-primary-dark"
        aria-hidden="true"
      ></span>
      <div
        className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"
        aria-hidden="true"
      />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Heading level={2} color="white" align="center" className="mb-4">
            {t('cta.headline')}
          </Heading>
          <Text align="center" size="xl" color="white" className="opacity-90 mb-8">
            {t('cta.subheadline')}
          </Text>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <Button 
                variant="secondary" 
                size="lg"
                rightIcon={
                  <ArrowRight className={`transition-transform duration-300 group-hover:translate-x-1 ${
                    isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
                  }`} />
                }
                className="group bg-secondary text-white hover:bg-secondary-600"
              >
                {t('cta.buttons.join')}
              </Button>
            </Link>
            <Link to="/contact">
              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                {t('cta.buttons.contact')}
              </Button>
            </Link>
          </div>
        </motion.div>
      </Container>
    </Section>
  )
}