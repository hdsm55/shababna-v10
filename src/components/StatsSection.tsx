import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Section } from './ui/Section'
import { Container } from './ui/Container'
import { Heading, Text } from './ui/Typography'
import { Card } from './ui/Card'

export default function StatsSection() {
  const { t } = useTranslation()
  const stats = [
    { value: '100+', label: t('stats.volunteers') },
    { value: '50+', label: t('stats.projects') },
    { value: '1000+', label: t('stats.beneficiaries') },
    { value: '10+', label: t('stats.partners') },
  ]

  return (
    <Section background="white">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="text-center border border-gray-100 hover:border-gray-200 transition-colors">
                <Heading level={3} className="text-primary mb-2">
                  {stat.value}
                </Heading>
                <Text color="muted">
                  {stat.label}
                </Text>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}