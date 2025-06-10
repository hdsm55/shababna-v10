// FILE: src/components/JoinSection.tsx
import { useTranslation } from 'react-i18next'
import { ArrowRight } from 'lucide-react'

export default function JoinSection() {
  const { t, i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  return (
    <section id="join" className="relative isolate overflow-hidden">
      <span
        className="absolute inset-0 bg-gradient-to-b from-primary to-dark/95"
        aria-hidden="true"
      />
      <div className="relative z-10 flex flex-col items-center justify-center text-center py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="font-extrabold text-4xl sm:text-5xl md:text-6xl text-light mb-4">
            {t('join.heading')}
          </h2>
          <p className="text-xl sm:text-2xl text-accent mb-6">
            {t('join.subheading')}
          </p>
          <button
            className="mt-8 btn btn-accent text-dark hover:brightness-110 focus:outline-none focus:ring-4 focus:ring-accent/60 rtl:flex-row-reverse flex items-center gap-2"
            role="link"
          >
            {t('join.button')}
            <ArrowRight
              className={`w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 ${
                isRTL ? 'rotate-180 group-hover:-translate-x-1' : ''
              }`}
            />
          </button>
        </div>
      </div>
    </section>
  )
}
