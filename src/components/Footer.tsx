// FILE: src/components/Footer.tsx
import { Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion } from 'framer-motion'
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ArrowUp,
  Heart,
  ExternalLink,
} from 'lucide-react'

export default function Footer() {
  const { t, i18n } = useTranslation()
  const changeLang = (lang: string) => i18n.changeLanguage(lang)

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  const mainLinks = [
    { to: '/about', label: t('footer.about', 'من نحن') },
    { to: '/projects', label: t('footer.projects', 'مشاريعنا') },
    { to: '/events', label: t('footer.events', 'فعالياتنا') },
    { to: '/blog', label: t('footer.blog', 'المدونة') },
    { to: '/who-we-are', label: t('footer.whoWeAre', 'نحن') },
    { to: '/reports', label: t('footer.reports', 'التقارير') },
  ]

  const supportLinks = [
    { to: '/contact', label: t('footer.contact', 'اتصل بنا') },
    { to: '/faq', label: t('footer.faq', 'الأسئلة الشائعة') },
    { to: '/volunteer', label: t('footer.volunteer', 'تطوع') },
    { to: '/join', label: t('footer.join', 'انضم إلينا') },
    { to: '/donate', label: t('footer.donate', 'تبرع') },
    { to: '/partners', label: t('footer.partners', 'الشركاء') },
  ]

  const legalLinks = [
    { to: '/privacy', label: t('footer.privacy', 'سياسة الخصوصية') },
    { to: '/terms', label: t('footer.terms', 'الشروط والأحكام') },
    { to: '/press', label: t('footer.press', 'الصحافة') },
  ]

  const socialLinks = [
    {
      icon: Facebook,
      href: 'https://facebook.com/shababuna',
      label: 'Facebook',
      color: 'hover:text-blue-400',
    },
    {
      icon: Twitter,
      href: 'https://twitter.com/shababuna',
      label: 'Twitter',
      color: 'hover:text-sky-400',
    },
    {
      icon: Instagram,
      href: 'https://instagram.com/shababuna',
      label: 'Instagram',
      color: 'hover:text-pink-400',
    },
    {
      icon: Linkedin,
      href: 'https://linkedin.com/company/shababuna',
      label: 'LinkedIn',
      color: 'hover:text-blue-600',
    },
    {
      icon: Youtube,
      href: 'https://youtube.com/@shababuna',
      label: 'YouTube',
      color: 'hover:text-red-500',
    },
  ]

  return (
    <footer className="relative bg-gradient-to-br from-midnight via-cetacean to-black text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[size:20px_20px]" />
      </div>

      {/* Main Footer Content */}
      <div className="relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2"
            >
              <div className="mb-6">
                <img
                  src="/Shababuna-Logo-1.1.svg.svg"
                  alt="Shababuna Logo"
                  className="h-12 w-auto mb-4"
                />
                <h3 className="font-tajawal text-2xl font-bold mb-4">
                  شبابنا - منظمة الشباب العالمية
                </h3>
                <p className="font-almarai text-white/70 leading-relaxed max-w-md">
                  نعمل على تمكين الشباب وبناء مستقبل أفضل من خلال التعليم
                  والتطوير والمشاركة المجتمعية.
                </p>
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center gap-3 text-white/70">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <a
                    href="mailto:info@shababuna.org"
                    className="hover:text-white transition-colors"
                  >
                    info@shababuna.org
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <a
                    href="tel:+1234567890"
                    className="hover:text-white transition-colors"
                  >
                    +123 456 7890
                  </a>
                </div>
                <div className="flex items-center gap-3 text-white/70">
                  <MapPin className="w-5 h-5 text-primary-400" />
                  <span>اسطنبول، تركيا</span>
                </div>
              </div>
            </motion.div>

            {/* Main Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <h4 className="font-tajawal text-lg font-bold mb-6 text-white">
                الروابط الرئيسية
              </h4>
              <ul className="space-y-3">
                {mainLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-almarai text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Support Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <h4 className="font-tajawal text-lg font-bold mb-6 text-white">
                الدعم والمساعدة
              </h4>
              <ul className="space-y-3">
                {supportLinks.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="font-almarai text-white/70 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span>{link.label}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Newsletter & Social */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <h4 className="font-tajawal text-lg font-bold mb-6 text-white">
                ابقى على تواصل
              </h4>

              {/* Newsletter */}
              <div className="mb-6">
                <p className="font-almarai text-white/70 text-sm mb-4">
                  اشترك في نشرتنا الإخبارية
                </p>
                <div className="flex gap-2">
                  <input
                    type="email"
                    placeholder="بريدك الإلكتروني"
                    className="flex-1 bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent backdrop-blur-sm"
                  />
                  <button className="bg-primary-500 hover:bg-primary-600 text-white px-4 py-2 rounded-lg transition-colors duration-300 flex-shrink-0">
                    <Mail className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <p className="font-almarai text-white/70 text-sm mb-4">
                  تابعنا على وسائل التواصل
                </p>
                <div className="flex gap-3">
                  {socialLinks.map(({ icon: Icon, href, label, color }) => (
                    <motion.a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`bg-white/10 hover:bg-white/20 text-white ${color} w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 backdrop-blur-sm hover:scale-110`}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      aria-label={label}
                    >
                      <Icon className="w-5 h-5" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>

          {/* Divider */}
          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              {/* Copyright */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-2 text-white/60"
              >
                <span className="font-almarai text-sm">
                  © {currentYear} شبابنا. جميع الحقوق محفوظة.
                </span>
                <Heart className="w-4 h-4 text-red-400 animate-pulse" />
              </motion.div>

              {/* Legal Links */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="flex items-center gap-6"
              >
                {legalLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="font-almarai text-white/60 hover:text-white text-sm transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>

              {/* Language Selector */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                <select
                  onChange={(e) => changeLang(e.target.value)}
                  value={i18n.language}
                  className="font-almarai bg-white/10 backdrop-blur-sm text-white border border-white/20 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-400 focus:border-transparent text-sm"
                  aria-label="اختر اللغة"
                >
                  <option value="ar" className="bg-midnight text-white">
                    العربية
                  </option>
                  <option value="en" className="bg-midnight text-white">
                    English
                  </option>
                  <option value="tr" className="bg-midnight text-white">
                    Türkçe
                  </option>
                </select>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        onClick={scrollToTop}
        className="fixed bottom-8 right-8 bg-primary-500 hover:bg-primary-600 text-white w-12 h-12 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center z-50 backdrop-blur-sm"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        aria-label="العودة للأعلى"
      >
        <ArrowUp className="w-6 h-6" />
      </motion.button>
    </footer>
  )
}
