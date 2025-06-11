import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight, Tag, Clock, CheckCircle } from 'lucide-react'
import { useTranslation } from 'react-i18next'

interface ProjectCardProps {
  id: string
  title: string
  description: string
  imageUrl?: string
  year?: string
  category?: string
  status?: string
}

export default function ProjectCard({
  id,
  title,
  description,
  imageUrl = 'https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg',
  year,
  category,
  status
}: ProjectCardProps) {
  const { i18n } = useTranslation()
  const isRTL = i18n.dir() === 'rtl'

  return (
    <motion.div
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className="h-full"
    >
      <div className="card card-hover h-full flex flex-col overflow-hidden">
        {imageUrl && (
          <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden relative">
            <img
              src={imageUrl}
              alt={title}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
              loading="lazy"
              width="400"
              height="300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            
            {/* Status Badge */}
            {status && (
              <div className="absolute top-3 left-3">
                <div className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  {status === 'active' && (
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse mr-1" />
                  )}
                  {status === 'completed' && (
                    <CheckCircle className="w-3 h-3 text-green-400 mr-1" />
                  )}
                  {status === 'planning' && (
                    <Clock className="w-3 h-3 text-yellow-400 mr-1" />
                  )}
                  <span className="font-almarai">{status}</span>
                </div>
              </div>
            )}
            
            {/* Category Badge */}
            {category && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  <Tag className="w-3 h-3 mr-1" />
                  <span className="font-almarai">{category}</span>
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className="flex-1 px-1">
          <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-2 font-tajawal">{title}</h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm font-almarai">{description}</p>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          {year && (
            <div className="flex items-center text-gray-500 text-sm font-almarai">
              <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{year}</span>
            </div>
          )}
          
          <Link
            to={`/projects/${id}`}
            className="inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors font-almarai group"
          >
            <span className="mr-1">اعرف المزيد</span>
            <ArrowRight className={`w-4 h-4 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}