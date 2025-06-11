import React, { HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLElement> {
  children: ReactNode;
  containerClassName?: string;
  fullWidth?: boolean;
  background?: 'light' | 'dark' | 'primary' | 'accent' | 'transparent';
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerClassName = '',
  fullWidth = false,
  background = 'light',
  ...props
}) => {
  const getBgColor = () => {
    switch (background) {
      case 'light':
        return 'bg-surface-100';
      case 'dark':
        return 'bg-primary text-white';
      case 'primary':
        return 'bg-primary text-white';
      case 'accent':
        return 'bg-accent text-white';
      case 'transparent':
        return 'bg-transparent';
      default:
        return 'bg-surface-100';
    }
  };

  return (
    <section 
      className={`py-16 ${getBgColor()} ${className}`} 
      dir="auto"
      {...props}
    >
      <div className={`px-4 sm:px-6 lg:px-8 ${fullWidth ? 'w-full' : 'max-w-7xl mx-auto'} ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};