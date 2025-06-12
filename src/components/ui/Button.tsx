import React, { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '../../utils/cn';

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'onDrag' | 'onDragEnd' | 'onDragStart'> {
  /**
   * The visual style of the button
   */
  variant?: 'primary' | 'secondary' | 'accent' | 'outline' | 'ghost' | 'link' | 'danger' | 'success';
  
  /**
   * The size of the button
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  
  /**
   * Whether the button is in a loading state
   */
  isLoading?: boolean;
  
  /**
   * Text to display when loading
   */
  loadingText?: string;
  
  /**
   * Icon to display before the button text
   */
  leftIcon?: ReactNode;
  
  /**
   * Icon to display after the button text
   */
  rightIcon?: ReactNode;
  
  /**
   * Whether the button should take up the full width of its container
   */
  fullWidth?: boolean;
  
  /**
   * The border radius of the button
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  
  /**
   * Whether to animate the button
   */
  animate?: boolean;
  
  /**
   * Additional motion props for the button
   */
  motionProps?: MotionProps;
}

/**
 * Button component for user interactions
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({
    variant = 'primary',
    size = 'md',
    isLoading = false,
    loadingText,
    leftIcon,
    rightIcon,
    fullWidth = false,
    rounded = 'md',
    animate = true,
    motionProps,
    children,
    className = '',
    disabled,
    ...props
  }, ref) => {
    // Determine the appropriate classes based on the variant
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'bg-primary text-white hover:bg-primary-dark focus:ring-primary/30';
        case 'secondary':
          return 'bg-secondary text-white hover:bg-secondary-dark focus:ring-secondary/30';
        case 'accent':
          return 'bg-accent text-white hover:bg-accent-dark focus:ring-accent/30';
        case 'outline':
          return 'bg-transparent border border-current text-primary hover:bg-primary/5 focus:ring-primary/20';
        case 'ghost':
          return 'bg-transparent hover:bg-gray-100 text-gray-700 focus:ring-gray-200';
        case 'link':
          return 'bg-transparent text-primary hover:underline p-0 h-auto focus:ring-0';
        case 'danger':
          return 'bg-error text-white hover:bg-error-600 focus:ring-error/30';
        case 'success':
          return 'bg-success text-white hover:bg-success-600 focus:ring-success/30';
        default:
          return 'bg-primary text-white hover:bg-primary-dark focus:ring-primary/30';
      }
    };

    // Determine the appropriate classes based on the size
    const getSizeClasses = () => {
      switch (size) {
        case 'xs':
          return 'text-xs px-2.5 py-1.5';
        case 'sm':
          return 'text-sm px-3 py-2';
        case 'md':
          return 'text-base px-4 py-2.5';
        case 'lg':
          return 'text-lg px-5 py-3';
        case 'xl':
          return 'text-xl px-6 py-3.5';
        default:
          return 'text-base px-4 py-2.5';
      }
    };

    // Determine the appropriate classes based on the rounded option
    const getRoundedClasses = () => {
      switch (rounded) {
        case 'none':
          return 'rounded-none';
        case 'sm':
          return 'rounded-sm';
        case 'md':
          return 'rounded-md';
        case 'lg':
          return 'rounded-lg';
        case 'full':
          return 'rounded-full';
        default:
          return 'rounded-md';
      }
    };

    // Combine all the classes
    const buttonClasses = cn(
      'inline-flex items-center justify-center gap-2',
      'font-medium transition-all duration-200',
      'focus:outline-none focus:ring-4',
      'disabled:opacity-60 disabled:cursor-not-allowed',
      'border border-transparent',
      getVariantClasses(),
      getSizeClasses(),
      getRoundedClasses(),
      fullWidth ? 'w-full' : '',
      className
    );

    // Default motion props
    const defaultMotionProps: MotionProps = {
      whileHover: disabled || isLoading ? {} : { scale: 1.02 },
      whileTap: disabled || isLoading ? {} : { scale: 0.98 },
      transition: { type: 'spring', stiffness: 400, damping: 17 },
      ...motionProps,
    };

    // Button content
    const content = (
      <>
        {isLoading && (
          <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
        )}
        {!isLoading && leftIcon && (
          <span className="inline-flex">{leftIcon}</span>
        )}
        <span className={isLoading && loadingText ? 'sr-only' : ''}>
          {isLoading && loadingText ? children : children}
        </span>
        {isLoading && loadingText && (
          <span>{loadingText}</span>
        )}
        {!isLoading && rightIcon && (
          <span className="inline-flex">{rightIcon}</span>
        )}
      </>
    );

    // Render with or without animation
    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={buttonClasses}
          disabled={disabled || isLoading}
          {...defaultMotionProps}
          {...props}
          aria-disabled={disabled || isLoading}
        >
          {content}
        </motion.button>
      );
    }

    return (
      <button
        ref={ref}
        className={buttonClasses}
        disabled={disabled || isLoading}
        {...props}
        aria-disabled={disabled || isLoading}
      >
        {content}
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;