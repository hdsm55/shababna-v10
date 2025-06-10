import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from 'framer-motion'
import { Calendar, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import timelineData from '../data/timeline.json'
import statsData from '../data/stats.json'
import Meta from '../components/Meta'
import ImageLoader from '../components/ImageLoader'

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

  return (
    <>
      <Meta
        title={t('about.title', 'About Us')}
        description={t(
          'about.description',
          'Learn about our mission, history, and impact in youth empowerment',
        )}
      />

      <div className="min-h-screen bg-base-100">
        {/* Hero Section */}
        <div className="relative min-h-[80vh] flex items-center">
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

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-white">
            <motion.div
              initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                {t('about.hero.title', 'Empowering Youth Globally')}
              </h1>

              <p className="text-xl md:text-2xl text-white/90 mb-8">
                {t(
                  'about.hero.subtitle',
                  'Building bridges across cultures, fostering leadership, and creating positive change',
                )}
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg bg-white text-primary hover:bg-white/90 gap-2"
                >
                  {t('about.hero.cta_primary', 'Join Our Mission')}
                  <ArrowRight className="w-5 h-5" />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-lg btn-outline text-white hover:bg-white hover:text-primary"
                >
                  {t('about.hero.cta_secondary', 'Learn More')}
                </motion.button>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-24 bg-base-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                {t('about.mission.title', 'Our Mission')}
              </h2>
              <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
                {t(
                  'about.mission.description',
                  'We are dedicated to empowering youth through education, leadership development, and global connections',
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {missionPoints.map((point, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card bg-base-200 hover:shadow-xl transition-shadow"
                >
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-2">
                      {t(point.title)}
                    </h3>
                    <p className="text-base-content/80">
                      {t(point.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-24 bg-base-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                {t('values.title', 'Our Values')}
              </h2>
              <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
                {t(
                  'values.description',
                  'Our core values guide everything we do',
                )}
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card bg-base-100 hover:shadow-xl transition-shadow"
                >
                  <figure className="relative h-48">
                    <ImageLoader
                      src={value.image}
                      alt={t(value.title)}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-base-100 to-transparent" />
                  </figure>
                  <div className="card-body">
                    <h3 className="text-xl font-semibold mb-2">
                      {t(value.title)}
                    </h3>
                    <p className="text-base-content/80">
                      {t(value.description)}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Timeline Section */}
        <div className="py-24 bg-base-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                {t('about.timeline.title', 'Our Journey')}
              </h2>
              <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
                {t(
                  'about.timeline.description',
                  "Key milestones in our organization's history",
                )}
              </p>
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
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative mb-12 ${
                    index % 2 === 0
                      ? 'md:ml-auto md:mr-8'
                      : 'md:mr-auto md:ml-8'
                  } md:w-1/2`}
                >
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary" />
                  <div className="card bg-base-200 hover:shadow-xl transition-shadow">
                    <div className="card-body">
                      <div className="flex items-center gap-2 text-primary mb-2">
                        <Calendar className="w-5 h-5" />
                        <span>{event.year}</span>
                      </div>
                      <h3 className="text-xl font-semibold mb-2">
                        {event.title[currentLanguage]}
                      </h3>
                      <p className="text-base-content/80">
                        {event.description[currentLanguage]}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-24 bg-base-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-4">
                {t('about.stats.title', 'Our Impact')}
              </h2>
              <p className="text-xl text-base-content/80 max-w-3xl mx-auto">
                {t('about.stats.description', 'Numbers that tell our story')}
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-8">
              {(statsData.stats as Stat[]).map((stat, index) => (
                <motion.div
                  key={index}
                  initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="card bg-base-100 hover:shadow-xl transition-shadow"
                >
                  <div className="card-body text-center">
                    <h3 className="text-4xl font-bold mb-2">{stat.value}</h3>
                    <p className="text-base-content/80">
                      {stat.label[currentLanguage]}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-24 bg-primary text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-4">
              {t('about.cta.title', 'Join Our Mission')}
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              {t(
                'about.cta.description',
                'Be part of something bigger. Together, we can create lasting change.',
              )}
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/volunteer"
                className="btn btn-lg bg-white text-primary hover:bg-white/90"
              >
                {t('about.cta.volunteer', 'Volunteer With Us')}
              </Link>
              <Link
                to="/donate"
                className="btn btn-lg btn-outline text-white hover:bg-white hover:text-primary"
              >
                {t('about.cta.donate', 'Make a Donation')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}