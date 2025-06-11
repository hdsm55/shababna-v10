import React, { HTMLAttributes, ReactNode } from 'react';

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

export const Container: React.FC<ContainerProps> = ({
  children,
  className = '',
  size = 'lg',
  ...props
}) => {
  const getSizeClass = () => {
    switch (size) {
      case 'sm':
        return 'max-w-3xl';
      case 'md':
        return 'max-w-5xl';
      case 'lg':
        return 'max-w-7xl';
      case 'xl':
        return 'max-w-screen-2xl';
      case 'full':
        return 'w-full';
      default:
        return 'max-w-7xl';
    }
  };

  return (
    <div 
      className={`mx-auto px-4 sm:px-6 lg:px-8 ${getSizeClass()} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};