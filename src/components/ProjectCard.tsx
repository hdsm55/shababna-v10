import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Calendar, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardFooter } from './ui/Card'
import { Heading, Text } from './ui/Typography'

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
    <Card className="h-full flex flex-col overflow-hidden">
      {imageUrl && (
        <div className="h-48 -mx-6 -mt-6 mb-4 overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-105"
            loading="lazy"
            width="400"
            height="300"
          />
        </div>
      )}
      
      <CardContent className="flex-1">
        {category && (
          <div className="mb-2">
            <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded">
              {category}
            </span>
          </div>
        )}
        
        <Heading level={3} className="text-primary mb-2">
          {title}
        </Heading>
        
        <Text color="muted" className="mb-4 line-clamp-3">
          {description}
        </Text>
      </CardContent>
      
      <CardFooter className="flex items-center justify-between mt-auto pt-4">
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
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Link>
      </CardFooter>
    </Card>
  );
}