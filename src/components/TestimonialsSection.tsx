import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { Section } from './ui/Section'
import { Container } from './ui/Container'
import { Heading, Text } from './ui/Typography'
import { Card, CardContent } from './ui/Card'
import { Quote } from 'lucide-react'

export default function TestimonialsSection() {
  const { t } = useTranslation()
  const testimonials = [
    {
      name: t('testimonials.volunteer1.name'),
      role: t('testimonials.volunteer1.role'),
      content: t('testimonials.volunteer1.content'),
    },
    {
      name: t('testimonials.volunteer2.name'),
      role: t('testimonials.volunteer2.role'),
      content: t('testimonials.volunteer2.content'),
    },
    {
      name: t('testimonials.volunteer3.name'),
      role: t('testimonials.volunteer3.role'),
      content: t('testimonials.volunteer3.content'),
    },
  ]

  return (
    <Section background="light">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <Heading level={2} align="center" className="mb-4">
            {t('testimonials.heading')}
          </Heading>
          <Text align="center" color="muted" className="max-w-2xl mx-auto">
            {t('testimonials.subheading')}
          </Text>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full border border-gray-100 hover:border-gray-200 transition-colors">
                <CardContent>
                  <div className="mb-4 text-accent opacity-30">
                    <Quote size={32} />
                  </div>
                  <Text color="muted" className="mb-6 italic">
                    "{testimonial.content}"
                  </Text>
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                    <div className="ml-4">
                      <Heading level={4} className="text-lg">
                        {testimonial.name}
                      </Heading>
                      <Text size="sm" color="muted">
                        {testimonial.role}
                      </Text>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  )
}