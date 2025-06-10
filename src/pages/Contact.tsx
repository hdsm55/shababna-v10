import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin } from 'lucide-react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import Meta from '../components/Meta'

export default function Contact() {
  const { t } = useTranslation()
  const { executeRecaptcha } = useGoogleReCaptcha()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!executeRecaptcha) return

    setIsSubmitting(true)
    try {
      const token = await executeRecaptcha('contact_form')
      // Form submission logic will be implemented here
      console.log('Form submitted:', { ...formData, token })
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <>
      <Meta
        title={t('contact.title', 'Contact Us')}
        description={t(
          'contact.description',
          'Get in touch with us for any inquiries or collaboration opportunities',
        )}
      />

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
                "Have questions? We'd love to hear from you.",
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
              <div className="bg-base-200 rounded-xl shadow-xl p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-medium text-base-content mb-2"
                    >
                      {t('contact.form.name', 'Name')}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-base-content mb-2"
                    >
                      {t('contact.form.email', 'Email')}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="subject"
                      className="block text-sm font-medium text-base-content mb-2"
                    >
                      {t('contact.form.subject', 'Subject')}
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-base-content mb-2"
                    >
                      {t('contact.form.message', 'Message')}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="textarea textarea-bordered w-full"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full gap-2"
                  >
                    {isSubmitting ? (
                      <span className="loading loading-spinner" />
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        {t('contact.form.submit', 'Send Message')}
                      </>
                    )}
                  </button>
                </form>
              </div>
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
                    <Mail className="w-6 h-6 text-primary mt-1" />
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
                    <Phone className="w-6 h-6 text-primary mt-1" />
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
                    <MapPin className="w-6 h-6 text-primary mt-1" />
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
        </div>
      </div>
    </>
  )
}
