import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Heart,
  CheckCircle,
  ArrowRight,
  Star,
  Globe,
  Award,
} from 'lucide-react'
import Meta from '../components/Meta'

interface FormData {
  name: string
  email: string
  phone: string
  age: string
  country: string
  city: string
  interests: string[]
  experience: string
  motivation: string
  availability: string
}

const interests = [
  'التطوع المجتمعي',
  'البرمجة والتكنولوجيا',
  'التعليم والتدريب',
  'الفنون والثقافة',
  'الرياضة والصحة',
  'البيئة والاستدامة',
  'ريادة الأعمال',
  'الإعلام والتصوير',
]

export default function Join() {
  const { t, i18n } = useTranslation()
  const navigate = useNavigate()
  const isRTL = i18n.dir() === 'rtl'

  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    age: '',
    country: '',
    city: '',
    interests: [],
    experience: '',
    motivation: '',
    availability: '',
  })

  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleInterestToggle = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Redirect after success
    setTimeout(() => {
      navigate('/')
    }, 3000)
  }

  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1)
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-midnight via-cetacean to-black flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center max-w-md w-full border border-white/20"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <CheckCircle className="w-10 h-10 text-white" />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-3xl font-bold text-white mb-4 font-tajawal"
          >
            مرحباً بك في شبابنا!
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-white/80 font-almarai mb-6"
          >
            تم تسجيل طلبك بنجاح. سنتواصل معك قريباً لإكمال عملية الانضمام.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-secondary-400 font-almarai text-sm"
          >
            سيتم تحويلك للصفحة الرئيسية خلال 3 ثوانٍ...
          </motion.div>
        </motion.div>
      </div>
    )
  }

  return (
    <>
      <Meta
        title={t('join.title', 'Join Our Community')}
        description={t(
          'join.description',
          'Join our global community of youth leaders and change-makers',
        )}
      />

      <div className="min-h-screen bg-gradient-to-br from-midnight via-cetacean to-black">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-r from-midnight/90 to-cetacean/90 py-20">
          <div className="container mx-auto px-4 relative z-10">
          <motion.div
              initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className="inline-flex items-center gap-2 bg-secondary-400/20 backdrop-blur-md border border-secondary-400/30 rounded-full px-6 py-3 mb-6 text-sm text-secondary-400 font-almarai">
                <Star className="w-4 h-4" />
                انضم إلى عائلة شبابنا العالمية
              </div>

              <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-tajawal">
                ابدأ رحلتك معنا
            </h1>

              <p className="text-xl text-white/80 max-w-2xl mx-auto font-almarai">
                انضم إلى أكثر من 50,000 شاب وشابة في رحلة التطوير والتأثير
                الإيجابي
            </p>
          </motion.div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-secondary-400/20 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl"></div>
        </div>

        {/* Form Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            {/* Progress Bar */}
            <div className="mb-12">
              <div className="flex items-center justify-center mb-4">
                {[1, 2, 3].map((step) => (
                  <React.Fragment key={step}>
            <motion.div
                      initial={{ scale: 0.8 }}
                      animate={{
                        scale: currentStep >= step ? 1.1 : 0.8,
                        backgroundColor:
                          currentStep >= step
                            ? '#F2C94C'
                            : 'rgba(255,255,255,0.2)',
                      }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold ${
                        currentStep >= step ? 'bg-secondary-400' : 'bg-white/20'
                      }`}
                    >
                      {step}
                    </motion.div>
                    {step < 3 && (
                      <div
                        className={`w-16 h-1 mx-4 rounded ${
                          currentStep > step
                            ? 'bg-secondary-400'
                            : 'bg-white/20'
                        }`}
                      />
                    )}
                  </React.Fragment>
                ))}
              </div>

              <div className="text-center">
                <p className="text-white/80 font-almarai">
                  الخطوة {currentStep} من 3
                </p>
              </div>
            </div>

            {/* Form */}
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 md:p-12 border border-white/20"
            >
              <form onSubmit={handleSubmit}>
                {/* Step 1: Personal Information */}
                {currentStep === 1 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2 font-tajawal">
                        المعلومات الشخصية
                      </h2>
                      <p className="text-white/70 font-almarai">
                        أخبرنا عن نفسك
                      </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-white mb-2 font-almarai font-medium">
                          الاسم الكامل
                        </label>
                        <div className="relative">
                          <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                          <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                            placeholder="أدخل اسمك الكامل"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-almarai font-medium">
                          العمر
                        </label>
                        <div className="relative">
                          <Calendar className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                          <select
                            name="age"
                            value={formData.age}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                            required
                          >
                            <option value="">اختر عمرك</option>
                            <option value="16-20">16-20 سنة</option>
                            <option value="21-25">21-25 سنة</option>
                            <option value="26-30">26-30 سنة</option>
                            <option value="31-35">31-35 سنة</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-almarai font-medium">
                          البريد الإلكتروني
                        </label>
                        <div className="relative">
                          <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                          <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-almarai font-medium">
                          رقم الهاتف
                        </label>
                        <div className="relative">
                          <Phone className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                            placeholder="+966 XX XXX XXXX"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-almarai font-medium">
                          الدولة
                        </label>
                        <div className="relative">
                          <Globe className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                          <input
                            type="text"
                            name="country"
                            value={formData.country}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                            placeholder="السعودية"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-white mb-2 font-almarai font-medium">
                          المدينة
                        </label>
                        <div className="relative">
                          <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                          <input
                            type="text"
                            name="city"
                            value={formData.city}
                            onChange={handleInputChange}
                            className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                            placeholder="الرياض"
                            required
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Step 2: Interests & Experience */}
                {currentStep === 2 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2 font-tajawal">
                        اهتماماتك وخبراتك
                </h2>
                      <p className="text-white/70 font-almarai">
                        ساعدنا في فهم ما يثير اهتمامك
                      </p>
                    </div>

                    <div>
                      <label className="block text-white mb-4 font-almarai font-medium">
                        اختر مجالات اهتمامك
                      </label>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {interests.map((interest) => (
                          <motion.button
                            key={interest}
                            type="button"
                            onClick={() => handleInterestToggle(interest)}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            className={`p-4 rounded-xl border transition-all duration-300 font-almarai text-sm ${
                              formData.interests.includes(interest)
                                ? 'bg-secondary-400/20 border-secondary-400 text-secondary-400'
                                : 'bg-white/10 border-white/20 text-white hover:border-white/40'
                            }`}
                          >
                            {interest}
                          </motion.button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-white mb-2 font-almarai font-medium">
                        خبرتك السابقة في التطوع
                      </label>
                      <div className="relative">
                        <Award className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                        <textarea
                          name="experience"
                          value={formData.experience}
                          onChange={handleInputChange}
                          rows={4}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai resize-none"
                          placeholder="أخبرنا عن خبراتك السابقة في التطوع أو المشاريع المجتمعية"
                          required
                        />
                      </div>
              </div>

                    <div>
                      <label className="block text-white mb-2 font-almarai font-medium">
                        الوقت المتاح للتطوع
                      </label>
                      <select
                        name="availability"
                        value={formData.availability}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                        required
                      >
                        <option value="">اختر الوقت المتاح</option>
                        <option value="weekends">عطلة نهاية الأسبوع</option>
                        <option value="evenings">المساء بعد العمل</option>
                        <option value="flexible">مرن حسب الحاجة</option>
                        <option value="fulltime">وقت كامل</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Step 3: Motivation */}
                {currentStep === 3 && (
                  <div className="space-y-8">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-white mb-2 font-tajawal">
                        الخطوة الأخيرة
                </h2>
                      <p className="text-white/70 font-almarai">
                        أخبرنا عن دافعك للانضمام
                      </p>
                    </div>

                    <div>
                      <label className="block text-white mb-2 font-almarai font-medium">
                        لماذا تريد الانضمام لشبابنا؟
                      </label>
                      <div className="relative">
                        <Heart className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                        <textarea
                          name="motivation"
                          value={formData.motivation}
                          onChange={handleInputChange}
                          rows={6}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai resize-none"
                          placeholder="شاركنا قصتك ودافعك للانضمام لمنظمة شبابنا العالمية..."
                          required
                        />
                      </div>
                    </div>

                    <div className="bg-secondary-400/10 border border-secondary-400/20 rounded-xl p-6">
                      <h3 className="text-secondary-400 font-bold mb-4 font-tajawal">
                        ما ستحصل عليه كعضو في شبابنا:
                      </h3>
                      <ul className="space-y-2 text-white/80 font-almarai">
                        <li className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-secondary-400" />
                          فرص تطوعية متنوعة ومؤثرة
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-secondary-400" />
                          دورات تدريبية وورش عمل مجانية
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-secondary-400" />
                          شبكة علاقات عالمية من الشباب
                        </li>
                        <li className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-secondary-400" />
                          شهادات معتمدة في التطوع
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between items-center mt-12">
                  {currentStep > 1 && (
                    <motion.button
                      type="button"
                      onClick={prevStep}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="px-8 py-3 border-2 border-white/30 text-white rounded-full hover:border-white/50 hover:bg-white/10 transition-all duration-300 font-almarai font-medium"
                    >
                      السابق
                    </motion.button>
                  )}

                  {currentStep < 3 ? (
                    <motion.button
                      type="button"
                      onClick={nextStep}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-bold px-8 py-3 rounded-full shadow-xl transition-all duration-300 flex items-center gap-2 font-almarai ml-auto"
                    >
                      التالي
                      <ArrowRight
                        className={`w-5 h-5 ${isRTL ? 'rotate-180' : ''}`}
                      />
                    </motion.button>
                  ) : (
                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                      whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                      className="bg-gradient-to-r from-emerald-400 to-emerald-500 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold px-12 py-4 rounded-full shadow-xl transition-all duration-300 flex items-center gap-2 font-almarai ml-auto disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          جاري الإرسال...
                        </>
                      ) : (
                        <>
                          انضم الآن
                          <CheckCircle className="w-5 h-5" />
                        </>
                      )}
                    </motion.button>
                  )}
              </div>
              </form>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}
