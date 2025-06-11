import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { motion } from 'framer-motion';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  isLoading?: boolean;
  animate?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      fullWidth = false,
      leftIcon,
      rightIcon,
      isLoading = false,
      animate = true,
      className = '',
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'bg-accent text-white hover:bg-accent-hover focus:ring-accent/30';
        case 'secondary':
          return 'bg-white text-primary border border-gray-200 hover:bg-gray-50 focus:ring-primary/20';
        case 'outline':
          return 'bg-transparent border border-accent text-accent hover:bg-accent/5 focus:ring-accent/20';
        case 'ghost':
          return 'bg-transparent text-primary hover:bg-primary/5 focus:ring-primary/20';
        default:
          return 'bg-accent text-white hover:bg-accent-hover focus:ring-accent/30';
      }
    };

    const getSizeClasses = () => {
      switch (size) {
        case 'sm':
          return 'text-sm px-3 py-1.5 rounded-md';
        case 'md':
          return 'text-base px-5 py-2.5 rounded-lg';
        case 'lg':
          return 'text-lg px-6 py-3 rounded-lg';
        default:
          return 'text-base px-5 py-2.5 rounded-lg';
      }
    };

    const classes = `
      ${getVariantClasses()}
      ${getSizeClasses()}
      ${fullWidth ? 'w-full' : ''}
      inline-flex items-center justify-center gap-2
      font-medium transition-colors duration-200
      focus:outline-none focus:ring-4
      disabled:opacity-60 disabled:cursor-not-allowed
      ${className}
    `.trim();

    const content = (
      <>
        {isLoading && (
          <svg className="animate-spin -ml-1 mr-1 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        )}
        {!isLoading && leftIcon && <span className="inline-block">{leftIcon}</span>}
        <span>{children}</span>
        {!isLoading && rightIcon && <span className="inline-block">{rightIcon}</span>}
      </>
    );

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={classes}
          disabled={disabled || isLoading}
          whileHover={disabled || isLoading ? {} : { scale: 1.02 }}
          whileTap={disabled || isLoading ? {} : { scale: 0.98 }}
          {...props}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={classes}
        disabled={disabled || isLoading}
        {...props}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';