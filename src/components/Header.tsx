import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Globe, ChevronDown } from 'lucide-react'

const Header: React.FC = () => {
  const { i18n } = useTranslation()
  const location = useLocation()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { path: '/', label: 'الرئيسية', id: 'home' },
    { path: '/about', label: 'من نحن', id: 'about' },
    { path: '/projects', label: 'مشاريعنا', id: 'projects' },
    { path: '/events', label: 'الفعاليات', id: 'events' },
    { path: '/join', label: 'انضم إلينا', id: 'join' },
    { path: '/contact', label: 'تواصل معنا', id: 'contact' },
  ]

  const languages = [
    { code: 'ar', name: 'العربية', flag: '🇸🇦' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
    { code: 'tr', name: 'Türkçe', flag: '🇹🇷' },
  ]

  const toggleLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode)
    setIsLangOpen(false)
  }

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-midnight/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <nav className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.5 }}
              className="w-10 h-10 bg-gradient-to-r from-secondary to-secondary-500 rounded-full flex items-center justify-center"
            >
              <span className="text-white font-bold text-lg">ش</span>
            </motion.div>
            <span className="text-white font-bold text-xl font-tajawal group-hover:text-secondary transition-colors duration-300">
              شبابنا
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`relative px-4 py-2 font-almarai font-medium transition-all duration-300 ${
                  isActive(item.path)
                    ? 'text-secondary'
                    : 'text-white hover:text-secondary'
                }`}
              >
                {item.label}
                {isActive(item.path) && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-secondary"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-2 px-3 py-2 bg-white hover:bg-primary-100 border border-primary-200 rounded-full transition-all duration-300 text-primary-700 shadow-sm"
              >
                <Globe className="w-4 h-4 text-primary-700" />
                <span className="hidden sm:block font-almarai text-sm text-primary-700">
                  {languages.find((lang) => lang.code === i18n.language)
                    ?.name || 'العربية'}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-primary-700 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`}
                />
              </button>

              <AnimatePresence>
                {isLangOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute top-full right-0 mt-2 glass rounded-xl overflow-hidden min-w-[150px] z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => toggleLanguage(lang.code)}
                        className={`w-full flex items-center gap-3 px-4 py-3 text-left hover:bg-white/10 transition-colors duration-300 ${
                          i18n.language === lang.code
                            ? 'text-secondary'
                            : 'text-white'
                        }`}
                      >
                        <span>{lang.flag}</span>
                        <span className="font-almarai">{lang.name}</span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* CTA Button */}
            <Link
              to="/join"
              className="hidden sm:block bg-gradient-to-r from-secondary to-secondary-500 hover:from-secondary-500 hover:to-secondary-600 text-white font-bold px-6 py-2 rounded-full transition-all duration-300 font-almarai shadow-lg hover:shadow-xl hover:shadow-secondary/20"
            >
              انضم الآن
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-secondary transition-colors duration-300"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-midnight/98 backdrop-blur-lg border-t border-white/10"
          >
            <div className="container mx-auto px-4 py-6">
              <div className="space-y-4">
                {navItems.map((item) => (
                  <Link
                    key={item.id}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`block px-4 py-3 rounded-xl font-almarai font-medium transition-all duration-300 ${
                      isActive(item.path)
                        ? 'bg-secondary/20 text-secondary'
                        : 'text-white hover:bg-white/10 hover:text-secondary'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* Mobile CTA */}
                <Link
                  to="/join"
                  onClick={() => setIsMenuOpen(false)}
                  className="block bg-gradient-to-r from-secondary to-secondary-500 text-white font-bold px-6 py-3 rounded-xl text-center transition-all duration-300 font-almarai mt-6 shadow-lg"
                >
                  انضم الآن
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {(isMenuOpen || isLangOpen) && (
        <div
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-[-1]"
          onClick={() => {
            setIsMenuOpen(false)
            setIsLangOpen(false)
          }}
        />
      )}
    </header>
  )
}

export default Header