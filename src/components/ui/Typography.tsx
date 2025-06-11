import React, { HTMLAttributes, ReactNode } from 'react';

// Heading component
export interface HeadingProps extends HTMLAttributes<HTMLHeadingElement> {
  children: ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
}

export const Heading: React.FC<HeadingProps> = ({
  children,
  level = 2,
  weight = 'bold',
  align = 'left',
  className = '',
  ...props
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;
  
  const getWeightClass = () => {
    switch (weight) {
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'semibold':
        return 'font-semibold';
      case 'bold':
        return 'font-bold';
      default:
        return 'font-bold';
    }
  };
  
  const getAlignClass = () => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };
  
  const getSizeClass = () => {
    switch (level) {
      case 1:
        return 'text-4xl md:text-5xl';
      case 2:
        return 'text-3xl md:text-4xl';
      case 3:
        return 'text-2xl md:text-3xl';
      case 4:
        return 'text-xl md:text-2xl';
      case 5:
        return 'text-lg md:text-xl';
      case 6:
        return 'text-base md:text-lg';
      default:
        return 'text-3xl md:text-4xl';
    }
  };

  return (
    <Tag 
      className={`${getSizeClass()} ${getWeightClass()} ${getAlignClass()} text-gray-900 ${className}`}
      {...props}
    >
      {children}
    </Tag>
  );
};

// Text component
export interface TextProps extends HTMLAttributes<HTMLParagraphElement> {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  align?: 'left' | 'center' | 'right';
  color?: 'default' | 'muted' | 'primary' | 'accent';
}

export const Text: React.FC<TextProps> = ({
  children,
  size = 'md',
  weight = 'normal',
  align = 'left',
  color = 'default',
  className = '',
  ...props
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'xs':
        return 'text-xs';
      case 'sm':
        return 'text-sm';
      case 'md':
        return 'text-base';
      case 'lg':
        return 'text-lg';
      case 'xl':
        return 'text-xl';
      default:
        return 'text-base';
    }
  };
  
  const getWeightClass = () => {
    switch (weight) {
      case 'normal':
        return 'font-normal';
      case 'medium':
        return 'font-medium';
      case 'semibold':
        return 'font-semibold';
      case 'bold':
        return 'font-bold';
      default:
        return 'font-normal';
    }
  };
  
  const getAlignClass = () => {
    switch (align) {
      case 'left':
        return 'text-left';
      case 'center':
        return 'text-center';
      case 'right':
        return 'text-right';
      default:
        return 'text-left';
    }
  };
  
  const getColorClass = () => {
    switch (color) {
      case 'default':
        return 'text-gray-900';
      case 'muted':
        return 'text-gray-600';
      case 'primary':
        return 'text-primary';
      case 'accent':
        return 'text-accent';
      default:
        return 'text-gray-900';
    }
  };

  return (
    <p 
      className={`${getSizeClass()} ${getWeightClass()} ${getAlignClass()} ${getColorClass()} ${className}`}
      {...props}
    >
      {children}
    </p>
  );
};