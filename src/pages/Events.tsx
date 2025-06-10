import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Star,
  Filter,
  Search,
  ArrowRight,
  CheckCircle,
  User,
  Mail,
  Phone,
  Heart,
} from 'lucide-react'
import Meta from '../components/Meta'

interface Event {
  id: number
  title: string
  description: string
  date: string
  time: string
  location: string
  participants: number
  maxParticipants: number
  category: string
  featured: boolean
  image: string
  price: number
  organizer: string
}

const events: Event[] = [
  {
    id: 1,
    title: 'مؤتمر الشباب العربي للتكنولوجيا',
    description:
      'مؤتمر شامل يجمع خبراء التكنولوجيا والشباب المبدع لمناقشة مستقبل التقنية في المنطقة',
    date: '2024-06-15',
    time: '09:00',
    location: 'الرياض، السعودية',
    participants: 450,
    maxParticipants: 500,
    category: 'تكنولوجيا',
    featured: true,
    image: 'https://images.pexels.com/photos/7688336/pexels-photo-7688336.jpeg',
    price: 0,
    organizer: 'شبابنا العالمية',
  },
  {
    id: 2,
    title: 'ورشة ريادة الأعمال للشباب',
    description:
      'تعلم أساسيات ريادة الأعمال وبناء الشركات الناشئة مع خبراء في المجال',
    date: '2024-06-20',
    time: '14:00',
    location: 'دبي، الإمارات',
    participants: 85,
    maxParticipants: 100,
    category: 'ريادة أعمال',
    featured: false,
    image: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg',
    price: 150,
    organizer: 'مركز الإبداع',
  },
  {
    id: 3,
    title: 'معسكر التطوع البيئي',
    description:
      'انضم إلينا في حملة تنظيف الشواطئ وزراعة الأشجار للحفاظ على البيئة',
    date: '2024-06-25',
    time: '07:00',
    location: 'الدوحة، قطر',
    participants: 120,
    maxParticipants: 150,
    category: 'بيئة',
    featured: true,
    image: 'https://images.pexels.com/photos/2547565/pexels-photo-2547565.jpeg',
    price: 0,
    organizer: 'جمعية البيئة',
  },
  {
    id: 4,
    title: 'مهرجان الثقافة والفنون',
    description:
      'احتفال بالتراث العربي والفنون المعاصرة مع عروض موسيقية ومعارض فنية',
    date: '2024-07-01',
    time: '18:00',
    location: 'بيروت، لبنان',
    participants: 300,
    maxParticipants: 400,
    category: 'ثقافة',
    featured: false,
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg',
    price: 75,
    organizer: 'مؤسسة الثقافة',
  },
  {
    id: 5,
    title: 'دورة القيادة الشبابية',
    description: 'تطوير مهارات القيادة والتأثير الإيجابي للشباب العربي',
    date: '2024-07-10',
    time: '10:00',
    location: 'عمان، الأردن',
    participants: 60,
    maxParticipants: 80,
    category: 'تطوير ذاتي',
    featured: true,
    image: 'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg',
    price: 200,
    organizer: 'أكاديمية القادة',
  },
  {
    id: 6,
    title: 'هاكاثون الحلول الذكية',
    description: 'مسابقة برمجية لتطوير حلول تقنية للتحديات المجتمعية',
    date: '2024-07-15',
    time: '09:00',
    location: 'القاهرة، مصر',
    participants: 200,
    maxParticipants: 250,
    category: 'تكنولوجيا',
    featured: false,
    image: 'https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg',
    price: 50,
    organizer: 'تك هب',
  },
]

const categories = [
  'جميع الفئات',
  'تكنولوجيا',
  'ريادة أعمال',
  'بيئة',
  'ثقافة',
  'تطوير ذاتي',
]

interface RegistrationForm {
  eventId: number
  name: string
  email: string
  phone: string
  experience: string
  motivation: string
}

export default function Events() {
  const { i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  const [selectedCategory, setSelectedCategory] = useState('جميع الفئات')
  const [searchTerm, setSearchTerm] = useState('')
  const [showRegistration, setShowRegistration] = useState(false)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [registrationForm, setRegistrationForm] = useState<RegistrationForm>({
    eventId: 0,
    name: '',
    email: '',
    phone: '',
    experience: '',
    motivation: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const filteredEvents = events.filter((event) => {
    const matchesCategory =
      selectedCategory === 'جميع الفئات' || event.category === selectedCategory
    const matchesSearch =
      event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      event.description.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleRegister = (event: Event) => {
    setSelectedEvent(event)
    setRegistrationForm((prev) => ({ ...prev, eventId: event.id }))
    setShowRegistration(true)
  }

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target
    setRegistrationForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsSuccess(true)

    // Reset after success
    setTimeout(() => {
      setIsSuccess(false)
      setShowRegistration(false)
      setRegistrationForm({
        eventId: 0,
        name: '',
        email: '',
        phone: '',
        experience: '',
        motivation: '',
      })
    }, 3000)
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('ar-SA', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  if (showRegistration && selectedEvent) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-midnight via-cetacean to-black">
        <Meta
          title="تسجيل في الفعالية - شبابنا"
          description="سجل في الفعالية واحصل على فرصة المشاركة"
        />

        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto">
            {/* Back button */}
            <motion.button
              onClick={() => setShowRegistration(false)}
              className="mb-8 flex items-center gap-2 text-white/70 hover:text-white transition-colors duration-300 font-almarai"
              whileHover={{ x: isRTL ? 5 : -5 }}
            >
              <ArrowRight className={`w-5 h-5 ${isRTL ? '' : 'rotate-180'}`} />
              العودة للفعاليات
            </motion.button>

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-12 text-center border border-white/20"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  className="w-20 h-20 bg-gradient-to-r from-emerald-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>

                <h2 className="text-3xl font-bold text-white mb-4 font-tajawal">
                  تم تسجيلك بنجاح!
                </h2>

                <p className="text-white/80 font-almarai mb-6">
                  تم تسجيلك في فعالية "{selectedEvent.title}" بنجاح. ستصلك رسالة
                  تأكيد على بريدك الإلكتروني.
                </p>

                <div className="text-secondary-400 font-almarai text-sm">
                  سيتم تحويلك لصفحة الفعاليات خلال 3 ثوانٍ...
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20"
              >
                {/* Event Summary */}
                <div className="mb-8 p-6 bg-secondary-400/10 border border-secondary-400/20 rounded-2xl">
                  <h2 className="text-2xl font-bold text-white mb-2 font-tajawal">
                    {selectedEvent.title}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-white/80 font-almarai">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-secondary-400" />
                      {formatDate(selectedEvent.date)}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-secondary-400" />
                      {selectedEvent.time}
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-secondary-400" />
                      {selectedEvent.location}
                    </div>
                  </div>
                  {selectedEvent.price > 0 && (
                    <div className="mt-4 text-secondary-400 font-bold">
                      رسوم المشاركة: {selectedEvent.price} ريال
                    </div>
                  )}
                </div>

                {/* Registration Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="text-center mb-6">
                    <h3 className="text-2xl font-bold text-white mb-2 font-tajawal">
                      تسجيل في الفعالية
                    </h3>
                    <p className="text-white/70 font-almarai">
                      املأ البيانات التالية للتسجيل
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
                          value={registrationForm.name}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                          placeholder="أدخل اسمك الكامل"
                          required
                        />
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
                          value={registrationForm.email}
                          onChange={handleInputChange}
                          className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                          placeholder="your@email.com"
                          required
                        />
                      </div>
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
                        value={registrationForm.phone}
                        onChange={handleInputChange}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                        placeholder="+966 XX XXX XXXX"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-almarai font-medium">
                      خبرتك في هذا المجال
                    </label>
                    <textarea
                      name="experience"
                      value={registrationForm.experience}
                      onChange={handleInputChange}
                      rows={3}
                      className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai resize-none"
                      placeholder="أخبرنا عن خبرتك ذات الصلة..."
                    />
                  </div>

                  <div>
                    <label className="block text-white mb-2 font-almarai font-medium">
                      لماذا تريد المشاركة؟
                    </label>
                    <div className="relative">
                      <Heart className="absolute left-4 top-4 w-5 h-5 text-white/50" />
                      <textarea
                        name="motivation"
                        value={registrationForm.motivation}
                        onChange={handleInputChange}
                        rows={4}
                        className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai resize-none"
                        placeholder="ما الذي يحفزك للمشاركة في هذه الفعالية؟"
                        required
                      />
                    </div>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    whileHover={{ scale: isSubmitting ? 1 : 1.05 }}
                    whileTap={{ scale: isSubmitting ? 1 : 0.95 }}
                    className="w-full bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-bold py-4 rounded-full shadow-xl transition-all duration-300 flex items-center justify-center gap-2 font-almarai disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        جاري التسجيل...
                      </>
                    ) : (
                      <>
                        تأكيد التسجيل
                        <CheckCircle className="w-5 h-5" />
                      </>
                    )}
                  </motion.button>
                </form>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-midnight via-cetacean to-black">
      <Meta
        title="الفعاليات - شبابنا"
        description="اكتشف وشارك في فعاليات شبابنا العالمية"
      />

      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-midnight/90 to-cetacean/90 py-20">
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <div className="inline-flex items-center gap-2 bg-secondary-400/20 backdrop-blur-md border border-secondary-400/30 rounded-full px-6 py-3 mb-6 text-sm text-secondary-400 font-almarai">
              <Calendar className="w-4 h-4" />
              فعاليات ملهمة ومؤثرة
            </div>

            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 font-tajawal">
              فعالياتنا القادمة
            </h1>

            <p className="text-xl text-white/80 max-w-2xl mx-auto font-almarai">
              انضم إلى مجتمع عالمي من الشباب المبدع في فعاليات تفاعلية ومؤثرة
            </p>
          </motion.div>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-secondary-400/20 rounded-full blur-xl"></div>
        <div className="absolute bottom-10 right-10 w-32 h-32 bg-accent-400/20 rounded-full blur-xl"></div>
      </div>

      {/* Filters & Search */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row gap-4 mb-8">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
                <input
                  type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white placeholder-white/50 focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai"
                placeholder="ابحث عن فعالية..."
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/50" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-white/10 border border-white/20 rounded-xl px-12 py-4 text-white focus:outline-none focus:border-secondary-400 focus:bg-white/15 transition-all duration-300 font-almarai appearance-none cursor-pointer min-w-[200px]"
              >
                {categories.map((category) => (
                  <option
                    key={category}
                    value={category}
                    className="bg-midnight text-white"
                  >
                    {category}
                      </option>
                    ))}
                  </select>
            </div>
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 hover:border-secondary-400/50 transition-all duration-300"
              >
                {/* Featured Badge */}
                {event.featured && (
                  <div className="absolute top-4 right-4 z-10 bg-gradient-to-r from-secondary-400 to-secondary-500 text-black px-3 py-1 rounded-full text-xs font-bold font-almarai">
                    <Star className="w-3 h-3 inline mr-1" />
                    مميز
                        </div>
                      )}

                {/* Event Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                  {/* Category Tag */}
                  <div className="absolute bottom-4 left-4 bg-accent-400/90 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold font-almarai">
                    {event.category}
                        </div>
                      </div>

                {/* Event Content */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 font-tajawal group-hover:text-secondary-400 transition-colors duration-300">
                    {event.title}
                  </h3>

                  <p className="text-white/70 text-sm mb-4 font-almarai line-clamp-2">
                    {event.description}
                  </p>

                  {/* Event Details */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center gap-2 text-white/60 text-sm font-almarai">
                      <Calendar className="w-4 h-4 text-secondary-400" />
                      {formatDate(event.date)}
                    </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm font-almarai">
                      <Clock className="w-4 h-4 text-secondary-400" />
                      {event.time}
                        </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm font-almarai">
                      <MapPin className="w-4 h-4 text-secondary-400" />
                      {event.location}
                      </div>
                    <div className="flex items-center gap-2 text-white/60 text-sm font-almarai">
                      <Users className="w-4 h-4 text-secondary-400" />
                      {event.participants}/{event.maxParticipants} مشارك
                    </div>
                  </div>

                  {/* Price & Register */}
                  <div className="flex items-center justify-between">
                    <div className="text-secondary-400 font-bold font-almarai">
                      {event.price === 0 ? 'مجاني' : `${event.price} ريال`}
                    </div>

                    <motion.button
                      onClick={() => handleRegister(event)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-secondary-400 to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-black font-bold px-6 py-2 rounded-full text-sm transition-all duration-300 flex items-center gap-2 font-almarai"
                    >
                      سجل الآن
                      <ArrowRight
                        className={`w-4 h-4 ${isRTL ? 'rotate-180' : ''}`}
                      />
                    </motion.button>
                    </div>
                  </div>
                </motion.div>
              ))}
          </div>

            {filteredEvents.length === 0 && (
            <div className="text-center py-16">
              <div className="text-white/50 text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2 font-tajawal">
                لا توجد فعاليات
              </h3>
              <p className="text-white/70 font-almarai">
                جرب تغيير معايير البحث أو الفئة
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
