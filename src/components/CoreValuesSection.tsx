import React from 'react'
import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Heart, Users, Globe, Award } from 'lucide-react'
import { Section } from './ui/Section'
import { Container } from './ui/Container'
import { Heading, Text } from './ui/Typography'
import { Card, CardContent } from './ui/Card'

export default function CoreValuesSection() {
  const { t } = useTranslation()
  const values = [
    {
      icon: Heart,
      title: t('values.compassion.title'),
      description: t('values.compassion.description'),
    },
    {
      icon: Users,
      title: t('values.community.title'),
      description: t('values.community.description'),
    },
    {
      icon: Globe,
      title: t('values.sustainability.title'),
      description: t('values.sustainability.description'),
    },
    {
      icon: Award,
      title: t('values.excellence.title'),
      description: t('values.excellence.description'),
    },
  ]

  return (
    <Section>
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Heading level={2} align="center" className="mb-4">
            {t('values.heading')}
          </Heading>
          <Text align="center" color="muted" className="max-w-2xl mx-auto">
            {t('values.subheading')}
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent>
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                      <Icon className="w-6 h-6 text-primary" aria-hidden="true" />
                    </div>
                    <Heading level={3} className="mb-2">
                      {value.title}
                    </Heading>
                    <Text color="muted">
                      {value.description}
                    </Text>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}