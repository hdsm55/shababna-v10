import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { ArrowLeft, Play } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Section } from './ui/Section'
import { Container } from './ui/Container'
import { Heading, Text } from './ui/Typography'
import { Button } from './ui/Button'

export default function HeroSection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.language === 'ar' || i18n.language === 'tr'

  return (
    <Section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      background="transparent"
      fullWidth
      spacing="none"
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
      </div>

      {/* Simple gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50 z-10" />

      {/* Minimal decorative elements */}
      <div className="absolute inset-0 z-15">
        <motion.div
          className="absolute top-1/4 right-1/4 w-32 h-32 bg-secondary/10 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-1/3 left-1/4 w-24 h-24 bg-accent/10 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.5, 0.3, 0.5],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>

      {/* Header content */}
      <Container className="relative z-20 text-center">
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
            <div className="w-2 h-2 bg-secondary rounded-full animate-pulse"></div>
            {t('hero.organization')}
          </motion.div>

          <Heading 
            level={1} 
            color="white" 
            align="center"
            className="font-tajawal mb-6"
          >
            {t('hero.title')}
          </Heading>

          <Text
            size="xl"
            align="center"
            color="white"
            className="mb-8 max-w-3xl mx-auto leading-relaxed font-almarai opacity-90"
          >
            {t('hero.subtitle')}
          </Text>

          {/* Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-center justify-center mb-12"
          >
            <Link to="/join">
              <Button
                variant="secondary"
                size="lg"
                rightIcon={<ArrowLeft className={`w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1 ${
                  isRTL ? 'rotate-180' : ''
                }`} />}
                className="group bg-secondary text-white hover:bg-secondary-600 font-tajawal font-bold shadow-lg hover:shadow-xl hover:scale-105"
                rounded="xl"
              >
                {t('hero.button')}
              </Button>
            </Link>

            <Button
              variant="outline"
              size="lg"
              leftIcon={
                <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-colors duration-300">
                  <Play className="w-4 h-4 text-white ml-0.5" />
                </div>
              }
              className="group border-2 border-white/30 text-white hover:border-white/50 hover:bg-white/10 font-tajawal font-semibold"
              rounded="xl"
            >
              {t('hero.watchVideo')}
            </Button>
          </motion.div>

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
  )
}