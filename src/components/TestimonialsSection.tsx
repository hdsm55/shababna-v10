// FILE: src/components/TestimonialsSection.tsx
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    key: 'testimonial1',
    name: 'Sarah Ahmed',
    role: 'Program Participant',
    avatar:
      'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
    rating: 5,
    text: 'This organization changed my perspective on leadership and community service. The programs are well-structured and impactful.',
  },
  {
    key: 'testimonial2',
    name: 'Michael Chen',
    role: 'Volunteer',
    avatar:
      'https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg',
    rating: 5,
    text: 'Being part of this community has been incredible. The support system and opportunities for growth are unmatched.',
  },
  {
    key: 'testimonial3',
    name: 'Aisha Patel',
    role: 'Mentor',
    avatar:
      'https://images.pexels.com/photos/3184423/pexels-photo-3184423.jpeg',
    rating: 5,
    text: 'Working with young leaders through this organization has been one of the most rewarding experiences of my career.',
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

export default function TestimonialsSection() {
  const { t } = useTranslation()

  return (
    <section
      id="testimonials"
      className="py-24 bg-gradient-to-b from-cetacean/90 to-black/90"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-tajawal font-bold text-white mb-4">
            {t('testimonials.heading', 'What People Say')}
          </h2>
          <p className="text-xl font-almarai text-white/80 max-w-3xl mx-auto">
            {t(
              'testimonials.subheading',
              'Hear from our community members about their transformative experiences'
            )}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.key}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group bg-cetacean/90 border border-white/10 rounded-xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 relative"
            >
              <div className="absolute top-4 right-4 text-primary/20">
                <Quote className="w-8 h-8" />
              </div>

              <div className="flex items-center mb-6">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover border-2 border-primary/30 mr-4"
                />
                <div>
                  <h3 className="font-tajawal font-bold text-white text-lg">
                    {t(
                      `testimonials.${testimonial.key}.name`,
                      testimonial.name
                    )}
                  </h3>
                  <p className="font-almarai text-white/60 text-sm">
                    {t(
                      `testimonials.${testimonial.key}.role`,
                      testimonial.role
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 text-yellow-400 fill-current"
                  />
                ))}
              </div>

              <blockquote className="text-white/80 font-almarai leading-relaxed italic">
                "{t(`testimonials.${testimonial.key}.text`, testimonial.text)}"
              </blockquote>

              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-primary/50 to-transparent rounded-b-xl transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
