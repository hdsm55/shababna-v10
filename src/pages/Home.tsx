import { Suspense, lazy } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from '../components/ui/Section'
import { Container } from '../components/ui/Container'
import { Heading, Text } from '../components/ui/Typography'
import { Button } from '../components/ui/Button'
import { Card, CardContent, CardFooter } from '../components/ui/Card'
import Meta from '../components/Meta'
import Loader from '../components/Loader'

// Lazy load only essential sections for better performance
const StatsSection = lazy(() => import('../components/StatsSection'))
const CoreValuesSection = lazy(() => import('../components/CoreValuesSection'))
const ProjectsSection = lazy(() => import('../components/ProjectsSection'))
const TestimonialsSection = lazy(
  () => import('../components/TestimonialsSection')
)
const CTASection = lazy(() => import('../components/CTASection'))

export default function Home() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  return (
    <>
      <Meta
        title={t('hero.title')}
        description={t('hero.subtitle')}
        image="/hero-poster.jpg"
      />

      {/* Hero Section */}
      <Section 
        className="min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 relative overflow-hidden"
        fullWidth
        background="transparent"
      >
        {/* Video Background */}
        <div className="absolute inset-0">
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
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/20 to-black/40" />
        </div>

        <Container className="relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Simple badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2 mb-6 text-sm text-white/90 font-almarai"
            >
              <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
              {t('hero.organization')}
            </motion.div>

            <Heading 
              level={1} 
              align="center"
              className="text-white mb-6 font-tajawal"
            >
              {t('hero.title')}
            </Heading>

            <Text 
              size="xl" 
              align="center" 
              className="text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed font-almarai"
            >
              {t('hero.subtitle')}
            </Text>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12">
              <Link to="/join">
                <Button 
                  variant="primary" 
                  size="lg"
                  rightIcon={<ArrowRight className={`${isRTL ? 'rotate-180' : ''}`} />}
                  className="group bg-accent hover:bg-accent-hover text-white font-tajawal font-bold"
                >
                  {t('hero.button')}
                </Button>
              </Link>

              <Button 
                variant="outline" 
                size="lg"
                leftIcon={
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <path d="M8 5v14l11-7z" fill="currentColor" />
                  </svg>
                }
                className="border-2 border-white/30 text-white hover:bg-white/10 font-tajawal font-semibold"
              >
                {t('hero.watchVideo')}
              </Button>
            </div>

            {/* Simple scroll indicator */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: 1 }}
              className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex flex-col items-center text-white/60 cursor-pointer hover:text-white/80 transition-colors duration-300"
              >
                <span className="text-xs font-almarai mb-2">
                  {t('hero.scrollDown')}
                </span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 14l-7 7m0 0l-7-7m7 7V3"
                  />
                </svg>
              </motion.div>
            </motion.div>
          </motion.div>
        </Container>
      </Section>

      {/* Stats Section */}
      <Suspense fallback={<Loader />}>
        <StatsSection />
      </Suspense>

      {/* Core Values Section - Simplified without images */}
      <Suspense fallback={<Loader />}>
        <CoreValuesSection />
      </Suspense>

      {/* Featured Projects Section */}
      <Suspense fallback={<Loader />}>
        <ProjectsSection />
      </Suspense>

      {/* Testimonials Section */}
      <Suspense fallback={<Loader />}>
        <TestimonialsSection />
      </Suspense>

      {/* Call to Action Section */}
      <Suspense fallback={<Loader />}>
        <CTASection />
      </Suspense>
    </>
  )
}