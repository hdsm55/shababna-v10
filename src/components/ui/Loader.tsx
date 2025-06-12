import React from 'react';
import { cn } from '../../utils/cn';

export interface LoaderProps {
  /**
   * Size of the loader
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Color of the loader
   */
  color?: 'primary' | 'secondary' | 'accent' | 'white' | 'current';
  
  /**
   * Thickness of the loader
   */
  thickness?: 'thin' | 'regular' | 'thick';
  
  /**
   * Text to display with the loader
   */
  text?: string;
  
  /**
   * Whether to center the loader
   */
  centered?: boolean;
  
  /**
   * Whether to show the loader in a full screen overlay
   */
  fullScreen?: boolean;
  
  /**
   * Additional class name
   */
  className?: string;
  
  /**
   * Loader variant
   */
  variant?: 'spinner' | 'dots' | 'pulse' | 'bars';
}

/**
 * Loader component for indicating loading state
 */
export const Loader: React.FC<LoaderProps> = ({
  size = 'md',
  color = 'primary',
  thickness = 'regular',
  text,
  centered = false,
  fullScreen = false,
  className,
  variant = 'spinner',
}) => {
  // Get size classes
  const getSizeClasses = () => {
    switch (size) {
      case 'xs': return 'w-4 h-4';
      case 'sm': return 'w-6 h-6';
      case 'md': return 'w-8 h-8';
      case 'lg': return 'w-12 h-12';
      case 'xl': return 'w-16 h-16';
      default: return 'w-8 h-8';
    }
  };
  
  // Get color classes
  const getColorClasses = () => {
    switch (color) {
      case 'primary': return 'text-primary';
      case 'secondary': return 'text-secondary';
      case 'accent': return 'text-accent';
      case 'white': return 'text-white';
      case 'current': return 'text-current';
      default: return 'text-primary';
    }
  };
  
  // Get thickness classes
  const getThicknessClasses = () => {
    switch (thickness) {
      case 'thin': return 'border-2';
      case 'regular': return 'border-3';
      case 'thick': return 'border-4';
      default: return 'border-3';
    }
  };
  
  // Render spinner variant
  const renderSpinner = () => (
    <div
      className={cn(
        getSizeClasses(),
        getColorClasses(),
        getThicknessClasses(),
        'rounded-full border-current border-t-transparent animate-spin'
      )}
    />
  );
  
  // Render dots variant
  const renderDots = () => (
    <div className="flex space-x-1">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className={cn(
            'rounded-full',
            getColorClasses(),
            {
              'w-1 h-1': size === 'xs',
              'w-2 h-2': size === 'sm',
              'w-2.5 h-2.5': size === 'md',
              'w-3 h-3': size === 'lg',
              'w-4 h-4': size === 'xl',
            },
            'animate-pulse'
          )}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
  
  // Render pulse variant
  const renderPulse = () => (
    <div
      className={cn(
        getSizeClasses(),
        getColorClasses(),
        'rounded-full bg-current opacity-75 animate-pulse'
      )}
    />
  );
  
  // Render bars variant
  const renderBars = () => (
    <div className="flex space-x-1 items-center">
      {[0, 1, 2, 3].map((i) => (
        <div
          key={i}
          className={cn(
            'bg-current',
            getColorClasses(),
            {
              'w-1 h-3': size === 'xs',
              'w-1 h-5': size === 'sm',
              'w-1.5 h-6': size === 'md',
              'w-2 h-8': size === 'lg',
              'w-2.5 h-10': size === 'xl',
            },
            'animate-pulse'
          )}
          style={{ animationDelay: `${i * 0.15}s` }}
        />
      ))}
    </div>
  );
  
  // Render the appropriate variant
  const renderLoader = () => {
    switch (variant) {
      case 'dots': return renderDots();
      case 'pulse': return renderPulse();
      case 'bars': return renderBars();
      case 'spinner':
      default: return renderSpinner();
    }
  };
  
  // Loader content with optional text
  const loaderContent = (
    <div className={cn('flex flex-col items-center', className)}>
      {renderLoader()}
      {text && (
        <div className={cn('mt-2 text-sm', getColorClasses())}>
          {text}
        </div>
      )}
    </div>
  );
  
  // Full screen loader
  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
        {loaderContent}
      </div>
    );
  }
  
  // Centered loader
  if (centered) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        {loaderContent}
      </div>
    );
  }
  
  // Default loader
  return loaderContent;
};

export default Loader;