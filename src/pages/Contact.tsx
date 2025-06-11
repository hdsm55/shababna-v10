import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { Mail, Phone, MapPin } from 'lucide-react'
import ContactForm from '../components/ContactForm'

export default function Contact() {
  const { t, i18n } = useTranslation()
  const currentLanguage = i18n.language
  const currentUrl = window.location.href

  return (
    <>
      <Helmet>
        <title>{t('contact.title', 'Contact Us')} | Shababna</title>
        <meta 
          name="description" 
          content={t('contact.description', 'Get in touch with us for any inquiries or collaboration opportunities')} 
        />
        <link rel="alternate" hrefLang="ar" href={currentUrl.replace(/\/[a-z]{2}\//, '/ar/')} />
        <link rel="alternate" hrefLang="en" href={currentUrl.replace(/\/[a-z]{2}\//, '/en/')} />
        <link rel="canonical" href={currentUrl} />
        <meta property="og:title" content={`${t('contact.title')} | Shababna`} />
        <meta property="og:description" content={t('contact.description')} />
        <meta property="og:url" content={currentUrl} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="min-h-screen bg-base-100 pt-24 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-bold text-base-content mb-4">
              {t('contact.title', 'Contact Us')}
            </h1>
            <p className="text-lg text-base-content/80 max-w-2xl mx-auto">
              {t(
                'contact.subtitle',
                "Have questions? We'd love to hear from you."
              )}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <ContactForm />
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="space-y-8"
            >
              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">
                  {t('contact.info.title', 'Contact Information')}
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <Mail className="w-6 h-6 text-primary mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-medium mb-1">
                        {t('contact.info.email', 'Email')}
                      </h3>
                      <a
                        href="mailto:contact@example.com"
                        className="text-base-content/80 hover:text-primary"
                      >
                        contact@example.com
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Phone className="w-6 h-6 text-primary mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-medium mb-1">
                        {t('contact.info.phone', 'Phone')}
                      </h3>
                      <a
                        href="tel:+1234567890"
                        className="text-base-content/80 hover:text-primary"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <MapPin className="w-6 h-6 text-primary mt-1" aria-hidden="true" />
                    <div>
                      <h3 className="font-medium mb-1">
                        {t('contact.info.address', 'Address')}
                      </h3>
                      <p className="text-base-content/80">
                        123 Main Street
                        <br />
                        City, State 12345
                        <br />
                        Country
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <h2 className="text-2xl font-semibold mb-6">
                  {t('contact.hours.title', 'Business Hours')}
                </h2>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-base-content/80">
                      {t('contact.hours.weekdays', 'Monday - Friday')}
                    </span>
                    <span className="font-medium">9:00 AM - 5:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/80">
                      {t('contact.hours.saturday', 'Saturday')}
                    </span>
                    <span className="font-medium">10:00 AM - 2:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-base-content/80">
                      {t('contact.hours.sunday', 'Sunday')}
                    </span>
                    <span className="font-medium">
                      {t('contact.hours.closed', 'Closed')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-16"
          >
            <h2 className="text-2xl font-semibold mb-6 text-center">
              {t('contact.map.title', 'Our Location')}
            </h2>
            <div className="rounded-xl overflow-hidden shadow-xl h-96">
              <iframe
                title="Google Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3151.835434509374!2d144.9537363153169!3d-37.81627917975171!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d43f1f1f1f1%3A0x5045675218ce6e0!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sau!4v1611816611234!5m2!1sen!2sau"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}