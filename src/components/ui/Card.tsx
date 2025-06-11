import React, { HTMLAttributes, ReactNode } from 'react';
import { motion } from 'framer-motion';

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  hover?: boolean;
  bordered?: boolean;
  animate?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  background?: 'white' | 'light' | 'dark' | 'primary' | 'secondary' | 'accent' | 'transparent';
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = true,
  bordered = false,
  animate = false,
  padding = 'md',
  shadow = 'md',
  background = 'white',
  ...props
}) => {
  const getPaddingClass = () => {
    switch (padding) {
      case 'none':
        return 'p-0';
      case 'sm':
        return 'p-4';
      case 'md':
        return 'p-6';
      case 'lg':
        return 'p-8';
      case 'xl':
        return 'p-10';
      default:
        return 'p-6';
    }
  };

  const getShadowClass = () => {
    switch (shadow) {
      case 'none':
        return '';
      case 'sm':
        return 'shadow-sm';
      case 'md':
        return 'shadow';
      case 'lg':
        return 'shadow-lg';
      case 'xl':
        return 'shadow-xl';
      default:
        return 'shadow';
    }
  };

  const getBackgroundClass = () => {
    switch (background) {
      case 'white':
        return 'bg-white';
      case 'light':
        return 'bg-gray-50';
      case 'dark':
        return 'bg-gray-800 text-white';
      case 'primary':
        return 'bg-primary-50';
      case 'secondary':
        return 'bg-secondary-50';
      case 'accent':
        return 'bg-accent-50';
      case 'transparent':
        return 'bg-transparent';
      default:
        return 'bg-white';
    }
  };

  const cardClasses = `
    rounded-xl
    ${getBackgroundClass()}
    ${getShadowClass()}
    ${hover ? 'hover:shadow-lg transition-all duration-200 hover:-translate-y-1' : ''}
    ${bordered ? 'border border-gray-200' : ''}
    ${getPaddingClass()}
    ${className}
  `.trim();

  if (animate) {
    return (
      <motion.div
        className={cardClasses}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={hover ? { y: -5, boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)' } : {}}
        {...props}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div
      className={cardClasses}
      {...props}
    >
      {children}
    </div>
  );
};

export interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`mb-4 ${className}`} {...props}>
      {children}
    </div>
  );
};

export interface CardTitleProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
}

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <h3 className={`text-xl font-semibold text-gray-900 ${className}`} {...props}>
      {children}
    </h3>
  );
};

export interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export interface CardFooterProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
}

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className = '',
  ...props
}) => {
  return (
    <div className={`mt-4 pt-4 border-t border-gray-100 ${className}`} {...props}>
      {children}
    </div>
  );
};