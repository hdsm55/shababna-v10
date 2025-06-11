import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import timelineData from '../data/timeline.json'
import statsData from '../data/stats.json'
import Meta from '../components/Meta'
import ImageLoader from '../components/ImageLoader'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading, Text } from '../components/ui/Typography'
import { Button } from '../components/ui/Button'
import { Card, CardContent } from '../components/ui/Card'

interface TimelineEvent {
  year: number
  title: {
    en: string
    ar: string
    tr: string
  }
  description: {
    en: string
    ar: string
    tr: string
  }
}

interface Stat {
  value: number
  label: {
    en: string
    ar: string
    tr: string
  }
}

const values = [
  {
    title: 'values.leadership.title',
    description: 'values.leadership.description',
    image: 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  },
  {
    title: 'values.diversity.title',
    description: 'values.diversity.description',
    image: 'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
  },
  {
    title: 'values.impact.title',
    description: 'values.impact.description',
    image: 'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
  },
]

const missionPoints = [
  {
    title: 'about.mission.empower.title',
    description: 'about.mission.empower.description',
  },
  {
    title: 'about.mission.connect.title',
    description: 'about.mission.connect.description',
  },
  {
    title: 'about.mission.innovate.title',
    description: 'about.mission.innovate.description',
  },
]

export default function About() {
  const { t, i18n } = useTranslation()
  const shouldReduceMotion = useReducedMotion()
  const currentLanguage = i18n.language as keyof TimelineEvent['title']
  const isRTL = i18n.dir() === 'rtl'

  return (
    <>
      <Meta
        title={t('about.title', 'About Us')}
        description={t(
          'about.description',
          'Learn about our mission, history, and impact in youth empowerment',
        )}
      />

      {/* Hero Section */}
      <Section 
        className="min-h-[80vh] flex items-center relative"
        background="transparent"
        fullWidth
      >
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70 mix-blend-multiply" />
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover"
            poster="/videos/hero-poster.jpg"
          >
            <source src="/videos/hero-hevc.mp4" type="video/mp4" />
          </video>
        </div>

        <Container className="relative text-white">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <Heading level={1} className="text-white mb-6">
              {t('about.hero.title', 'Empowering Youth Globally')}
            </Heading>

            <Text size="xl" className="text-white/90 mb-8">
              {t(
                'about.hero.subtitle',
                'Building bridges across cultures, fostering leadership, and creating positive change',
              )}
            </Text>

            <div className="flex flex-wrap gap-4">
              <Link to="/join">
                <Button 
                  variant="secondary" 
                  size="lg"
                  rightIcon={<ArrowRight className={`${isRTL ? 'rotate-180' : ''}`} />}
                >
                  {t('about.hero.cta_primary', 'Join Our Mission')}
                </Button>
              </Link>

              <Button 
                variant="outline" 
                size="lg"
                className="border-white text-white hover:bg-white/10"
              >
                {t('about.hero.cta_secondary', 'Learn More')}
              </Button>
            </div>
          </motion.div>
        </Container>
      </Section>

      {/* Mission Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} align="center" className="mb-4">
              {t('about.mission.title', 'Our Mission')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto">
              {t(
                'about.mission.description',
                'We are dedicated to empowering youth through education, leadership development, and global connections',
              )}
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {missionPoints.map((point, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent>
                    <Heading level={3} className="mb-2">
                      {t(point.title)}
                    </Heading>
                    <Text color="muted">
                      {t(point.description)}
                    </Text>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Values Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} align="center" className="mb-4">
              {t('values.title', 'Our Values')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto">
              {t(
                'values.description',
                'Our core values guide everything we do',
              )}
            </Text>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full">
                  <div className="relative h-48 -mx-6 -mt-6 mb-6">
                    <ImageLoader
                      src={value.image}
                      alt={t(value.title)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-white to-transparent" />
                  </div>
                  <CardContent>
                    <Heading level={3} className="mb-2">
                      {t(value.title)}
                    </Heading>
                    <Text color="muted">
                      {t(value.description)}
                    </Text>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Timeline Section */}
      <Section>
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} align="center" className="mb-4">
              {t('about.timeline.title', 'Our Journey')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto">
              {t(
                'about.timeline.description',
                "Key milestones in our organization's history",
              )}
            </Text>
          </div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-primary/20" />
            {(timelineData.events as TimelineEvent[]).map((event, index) => (
              <motion.div
                key={index}
                initial={
                  shouldReduceMotion
                    ? {}
                    : { opacity: 0, x: index % 2 === 0 ? -20 : 20 }
                }
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative mb-12 ${
                  index % 2 === 0
                    ? 'md:ml-auto md:mr-8'
                    : 'md:mr-auto md:ml-8'
                } md:w-1/2`}
              >
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                <Card>
                  <CardContent>
                    <div className="flex items-center gap-2 text-primary mb-2">
                      <Calendar className="w-5 h-5" />
                      <span>{event.year}</span>
                    </div>
                    <Heading level={3} className="mb-2">
                      {event.title[currentLanguage]}
                    </Heading>
                    <Text color="muted">
                      {event.description[currentLanguage]}
                    </Text>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Section background="light">
        <Container>
          <div className="text-center mb-16">
            <Heading level={2} align="center" className="mb-4">
              {t('about.stats.title', 'Our Impact')}
            </Heading>
            <Text align="center" color="muted" className="max-w-3xl mx-auto">
              {t('about.stats.description', 'Numbers that tell our story')}
            </Text>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {(statsData.stats as Stat[]).map((stat, index) => (
              <motion.div
                key={index}
                initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="text-center">
                  <CardContent>
                    <Heading level={3} className="mb-2">
                      {stat.value}
                    </Heading>
                    <Text color="muted">
                      {stat.label[currentLanguage]}
                    </Text>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA Section */}
      <Section background="primary">
        <Container className="text-center">
          <Heading level={2} className="text-white mb-4">
            {t('about.cta.title', 'Join Our Mission')}
          </Heading>
          <Text className="text-white/90 max-w-3xl mx-auto mb-8">
            {t(
              'about.cta.description',
              'Be part of something bigger. Together, we can create lasting change.',
            )}
          </Text>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/volunteer">
              <Button variant="secondary">
                {t('about.cta.volunteer', 'Volunteer With Us')}
              </Button>
            </Link>
            <Link to="/donate">
              <Button 
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                {t('about.cta.donate', 'Make a Donation')}
              </Button>
            </Link>
          </div>
        </Container>
      </Section>
    </>
  )
}