import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from './ui/Section'
import { Container } from './ui/Container'
import { Heading, Text } from './ui/Typography'
import { Button } from './ui/Button'

export default function JoinSection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  return (
    <Section background="accent" className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center opacity-10"></div>
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <Heading level={2} color="white" align="center" className="mb-4">
            {t('join.heading')}
          </Heading>
          <Text align="center" size="xl" color="white" className="opacity-90 max-w-2xl mx-auto mb-8">
            {t('join.subheading')}
          </Text>
          <Link to="/join">
            <Button
              variant="secondary"
              size="lg"
              rightIcon={
                <ArrowRight className={`transition-transform duration-300 group-hover:translate-x-1 ${
                  isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
                }`} />
              }
              className="group bg-white text-accent hover:bg-white/90"
            >
              {t('join.button')}
            </Button>
          </Link>
        </motion.div>
      </Container>
    </Section>
  )
}