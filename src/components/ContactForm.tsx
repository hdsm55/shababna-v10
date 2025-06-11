import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'
import { supabase } from '../lib/supabase'
import { logger } from '../utils/logger'
import { Button } from './ui/Button'
import { Heading, Text } from './ui/Typography'

interface ContactFormProps {
  className?: string
}

interface FormData {
  name: string
  email: string
  content: string
}

interface FormErrors {
  name?: string
  email?: string
  content?: string
  general?: string
}

export default function ContactForm({ className = '' }: ContactFormProps) {
  const { t } = useTranslation()
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    content: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}
    
    if (!formData.name.trim()) {
      newErrors.name = t('contact.form.errors.name', 'Name is required')
    }
    
    if (!formData.email.trim()) {
      newErrors.email = t('contact.form.errors.email', 'Email is required')
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = t('contact.form.errors.emailInvalid', 'Email is invalid')
    }
    
    if (!formData.content.trim()) {
      newErrors.content = t('contact.form.errors.content', 'Message is required')
    }
    
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    
    // Clear error when field is edited
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => {
        const newErrors = {...prev}
        delete newErrors[name as keyof FormErrors]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) return
    
    setIsSubmitting(true)
    
    try {
      logger.info('Submitting contact form', {
        tags: ['contact', 'form-submission']
      })
      
      const { error } = await supabase.from('messages').insert([{ 
        name: formData.name, 
        email: formData.email, 
        content: formData.content,
        created_at: new Date().toISOString()
      }])
      
      if (error) {
        throw error
      }
      
      // Success
      setIsSuccess(true)
      setFormData({
        name: '',
        email: '',
        content: ''
      })
      
      logger.info('Contact form submitted successfully', {
        tags: ['contact', 'form-success']
      })
      
      // Reset success state after 5 seconds
      setTimeout(() => {
        setIsSuccess(false)
      }, 5000)
      
    } catch (error) {
      logger.error('Contact form submission failed', {
        tags: ['contact', 'form-error'],
        metadata: { error }
      })
      
      setErrors({
        general: t(
          'contact.form.errors.general', 
          'An error occurred. Please try again later.'
        )
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 ${className}`}>
      {isSuccess ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-8"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring' }}
            className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <CheckCircle className="w-8 h-8 text-green-500" />
          </motion.div>
          <Heading level={3} className="text-white mb-2">
            {t('contact.form.success.title', 'Message Sent!')}
          </Heading>
          <Text className="text-white/80">
            {t('contact.form.success.message', 'Thank you for your message. We will get back to you soon.')}
          </Text>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4" aria-label={t('contact.form.title', 'Contact form')}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-white mb-1">
              {t('contact.form.name', 'Name')} <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full bg-white/10 border ${errors.name ? 'border-red-400' : 'border-white/20'} rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors`}
              placeholder={t('contact.form.namePlaceholder', 'Your name')}
              aria-required="true"
              aria-invalid={errors.name ? 'true' : 'false'}
              aria-describedby={errors.name ? 'name-error' : undefined}
            />
            {errors.name && (
              <p id="name-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.name}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-white mb-1">
              {t('contact.form.email', 'Email')} <span className="text-red-400">*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full bg-white/10 border ${errors.email ? 'border-red-400' : 'border-white/20'} rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors`}
              placeholder={t('contact.form.emailPlaceholder', 'your@email.com')}
              aria-required="true"
              aria-invalid={errors.email ? 'true' : 'false'}
              aria-describedby={errors.email ? 'email-error' : undefined}
            />
            {errors.email && (
              <p id="email-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.email}
              </p>
            )}
          </div>
          
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-white mb-1">
              {t('contact.form.message', 'Message')} <span className="text-red-400">*</span>
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows={5}
              className={`w-full bg-white/10 border ${errors.content ? 'border-red-400' : 'border-white/20'} rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:border-accent transition-colors resize-none`}
              placeholder={t('contact.form.messagePlaceholder', 'Your message...')}
              aria-required="true"
              aria-invalid={errors.content ? 'true' : 'false'}
              aria-describedby={errors.content ? 'content-error' : undefined}
            />
            {errors.content && (
              <p id="content-error" className="mt-1 text-sm text-red-400" role="alert">
                {errors.content}
              </p>
            )}
          </div>
          
          {errors.general && (
            <div className="bg-red-500/20 border border-red-400 rounded-lg p-3" role="alert">
              <p className="text-red-400 text-sm">{errors.general}</p>
            </div>
          )}
          
          <Button
            type="submit"
            variant="primary"
            fullWidth
            isLoading={isSubmitting}
            leftIcon={!isSubmitting ? <Send className="w-5 h-5" /> : undefined}
            className="bg-accent hover:bg-accent-hover text-white font-bold"
          >
            {isSubmitting 
              ? t('contact.form.sending', 'Sending...') 
              : t('contact.form.submit', 'Send Message')
            }
          </Button>
        </form>
      )}
    </div>
  )
}