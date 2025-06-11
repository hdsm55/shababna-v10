import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'

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
  imageUrl,
  year,
  category,
  status
}: ProjectCardProps) {
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
            
            {status && (
              <div className="absolute top-3 right-3">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/20 backdrop-blur-sm text-white border border-white/30">
                  {status}
                </span>
              </div>
            )}
          </div>
        )}
        
        <div className="flex-1">
          {category && (
            <div className="mb-2">
              <span className="inline-block px-2.5 py-1 text-xs font-medium bg-accent/10 text-accent rounded-full">
                {category}
              </span>
            </div>
          )}
          
          <h3 className="text-xl font-semibold text-primary mb-2 line-clamp-2">{title}</h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3 text-sm">{description}</p>
        </div>
        
        <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-100">
          {year && (
            <div className="flex items-center text-gray-500 text-sm">
              <Calendar className="w-4 h-4 mr-1" aria-hidden="true" />
              <span>{year}</span>
            </div>
          )}
          
          <Link
            to={`/projects/${id}`}
            className="inline-flex items-center text-accent hover:text-accent-hover font-medium transition-colors"
          >
            <span className="mr-1">اعرف المزيد</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}