import React, { InputHTMLAttributes, forwardRef } from 'react';
import { cn } from '../../utils/cn';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  /**
   * Label for the input
   */
  label?: string;
  
  /**
   * Helper text to display below the input
   */
  helperText?: string;
  
  /**
   * Error message to display
   */
  error?: string;
  
  /**
   * Left icon
   */
  leftIcon?: React.ReactNode;
  
  /**
   * Right icon
   */
  rightIcon?: React.ReactNode;
  
  /**
   * Whether the input is full width
   */
  fullWidth?: boolean;
  
  /**
   * Input size
   */
  size?: 'sm' | 'md' | 'lg';
  
  /**
   * Input variant
   */
  variant?: 'outlined' | 'filled' | 'unstyled';
}

/**
 * Input component for collecting user data
 */
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({
    label,
    helperText,
    error,
    leftIcon,
    rightIcon,
    fullWidth = false,
    size = 'md',
    variant = 'outlined',
    className,
    id,
    disabled,
    required,
    ...props
  }, ref) => {
    // Generate a unique ID if not provided
    const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;
    
    // Determine size classes
    const getSizeClasses = () => {
      switch (size) {
        case 'sm': return 'h-8 text-sm px-3';
        case 'lg': return 'h-12 text-lg px-4';
        default: return 'h-10 text-base px-4';
      }
    };
    
    // Determine variant classes
    const getVariantClasses = () => {
      switch (variant) {
        case 'filled':
          return 'bg-gray-100 border-transparent focus:bg-white';
        case 'unstyled':
          return 'border-transparent bg-transparent shadow-none focus:ring-0';
        default:
          return 'bg-white border-gray-300';
      }
    };
    
    // Combine all classes
    const inputClasses = cn(
      'block rounded-md',
      'focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary',
      'disabled:opacity-50 disabled:cursor-not-allowed',
      'transition-colors duration-200',
      getSizeClasses(),
      getVariantClasses(),
      error ? 'border-error focus:ring-error focus:border-error' : '',
      leftIcon ? 'pl-10' : '',
      rightIcon ? 'pr-10' : '',
      fullWidth ? 'w-full' : '',
      className
    );
    
    return (
      <div className={cn('flex flex-col', fullWidth ? 'w-full' : '')}>
        {label && (
          <label 
            htmlFor={inputId} 
            className={cn(
              'block text-sm font-medium mb-1',
              error ? 'text-error' : 'text-gray-700'
            )}
          >
            {label}
            {required && <span className="text-error ml-1">*</span>}
          </label>
        )}
        
        <div className="relative">
          {leftIcon && (
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              {leftIcon}
            </div>
          )}
          
          <input
            ref={ref}
            id={inputId}
            disabled={disabled}
            required={required}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${inputId}-error` : helperText ? `${inputId}-helper` : undefined}
            className={inputClasses}
            {...props}
          />
          
          {rightIcon && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
              {rightIcon}
            </div>
          )}
        </div>
        
        {(error || helperText) && (
          <div className="mt-1">
            {error ? (
              <p id={`${inputId}-error`} className="text-sm text-error" role="alert">
                {error}
              </p>
            ) : helperText ? (
              <p id={`${inputId}-helper`} className="text-sm text-gray-500">
                {helperText}
              </p>
            ) : null}
          </div>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;