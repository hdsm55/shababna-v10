import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, MapPin, Users, ExternalLink } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface Project {
  id: string;
  title: string;
  description: string;
  category: string;
  status: string;
  img_url: string;
  year: string;
  created_at: string;
  updated_at: string;
}

interface ProjectCardProps {
  project: Project;
  viewMode?: 'grid' | 'list';
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, viewMode = 'grid' }) => {
  const { t } = useTranslation();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'education':
        return 'bg-purple-100 text-purple-800';
      case 'health':
        return 'bg-red-100 text-red-800';
      case 'environment':
        return 'bg-green-100 text-green-800';
      case 'technology':
        return 'bg-blue-100 text-blue-800';
      case 'community':
        return 'bg-orange-100 text-orange-800';
      case 'arts':
        return 'bg-pink-100 text-pink-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (viewMode === 'list') {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
      >
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/3">
            <img
              src={project.img_url || 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg'}
              alt={project.title}
              className="w-full h-48 md:h-full object-cover"
              loading="lazy"
            />
          </div>
          <div className="md:w-2/3 p-6">
            <div className="flex flex-wrap gap-2 mb-3">
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
                {t(`projects.categories.${project.category}`)}
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                {t(`projects.status.${project.status}`)}
              </span>
            </div>
            
            <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
              {project.title}
            </h3>
            
            <p className="text-gray-600 mb-4 line-clamp-3">
              {project.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-500">
                {project.year && (
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>{project.year}</span>
                  </div>
                )}
              </div>
              
              <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
                {t('common.learnMore')}
                <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="relative">
        <img
          src={project.img_url || 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg'}
          alt={project.title}
          className="w-full h-48 object-cover"
          loading="lazy"
        />
        <div className="absolute top-4 left-4 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getCategoryColor(project.category)}`}>
            {t(`projects.categories.${project.category}`)}
          </span>
        </div>
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
            {t(`projects.status.${project.status}`)}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {project.title}
        </h3>
        
        <p className="text-gray-600 mb-4 line-clamp-3">
          {project.description}
        </p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            {project.year && (
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{project.year}</span>
              </div>
            )}
          </div>
          
          <button className="flex items-center gap-2 text-blue-600 hover:text-blue-800 font-medium">
            {t('common.learnMore')}
            <ExternalLink className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;