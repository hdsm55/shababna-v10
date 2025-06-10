import React, { forwardRef } from 'react'
import { motion, MotionProps } from 'framer-motion'

import { ButtonLoader } from './Loader'

export interface ButtonProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    'onDrag' | 'onDragEnd' | 'onDragStart'
  > {
  variant?:
    | 'primary'
    | 'secondary'
    | 'outline'
    | 'ghost'
    | 'danger'
    | 'success'
    | 'gradient'
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  loadingText?: string
  leftIcon?: React.ReactNode
  rightIcon?: React.ReactNode
  fullWidth?: boolean
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  animate?: boolean
  motionProps?: MotionProps
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      loading = false,
      loadingText,
      leftIcon,
      rightIcon,
      fullWidth = false,
      rounded = 'lg',
      animate = true,
      motionProps,
      children,
      className = '',
      disabled,
      ...props
    },
    ref,
  ) => {
    const getVariantClasses = () => {
      switch (variant) {
        case 'primary':
          return 'bg-primary-500 hover:bg-primary-600 text-white border-primary-500 hover:border-primary-600 shadow-lg hover:shadow-xl hover:shadow-primary-500/25'
        case 'secondary':
          return 'bg-white/10 hover:bg-white/20 text-white border-white/20 hover:border-white/40 backdrop-blur-sm'
        case 'outline':
          return 'bg-transparent hover:bg-primary-500/10 text-primary-500 border-primary-500 hover:border-primary-600 hover:text-primary-600'
        case 'ghost':
          return 'bg-transparent hover:bg-white/10 text-white border-transparent hover:border-white/20'
        case 'danger':
          return 'bg-red-500 hover:bg-red-600 text-white border-red-500 hover:border-red-600 shadow-lg hover:shadow-xl hover:shadow-red-500/25'
        case 'success':
          return 'bg-green-500 hover:bg-green-600 text-white border-green-500 hover:border-green-600 shadow-lg hover:shadow-xl hover:shadow-green-500/25'
        case 'gradient':
          return 'bg-gradient-to-r from-primary-500 to-accent-500 hover:from-primary-600 hover:to-accent-600 text-white border-transparent shadow-lg hover:shadow-xl hover:shadow-primary-500/25'
        default:
          return 'bg-primary-500 hover:bg-primary-600 text-white border-primary-500 hover:border-primary-600'
      }
    }

    const getSizeClasses = () => {
      switch (size) {
        case 'xs':
          return 'px-3 py-1.5 text-xs font-medium'
        case 'sm':
          return 'px-4 py-2 text-sm font-medium'
        case 'md':
          return 'px-6 py-3 text-base font-semibold'
        case 'lg':
          return 'px-8 py-4 text-lg font-semibold'
        case 'xl':
          return 'px-10 py-5 text-xl font-bold'
        default:
          return 'px-6 py-3 text-base font-semibold'
      }
    }

    const getRoundedClasses = () => {
      switch (rounded) {
        case 'none':
          return 'rounded-none'
        case 'sm':
          return 'rounded-sm'
        case 'md':
          return 'rounded-md'
        case 'lg':
          return 'rounded-lg'
        case 'full':
          return 'rounded-full'
        default:
          return 'rounded-lg'
      }
    }

    const getIconSize = () => {
      switch (size) {
        case 'xs':
          return 'w-3 h-3'
        case 'sm':
          return 'w-4 h-4'
        case 'md':
          return 'w-5 h-5'
        case 'lg':
          return 'w-6 h-6'
        case 'xl':
          return 'w-7 h-7'
        default:
          return 'w-5 h-5'
      }
    }

    const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-tajawal transition-all duration-300
    border focus:outline-none focus:ring-4 focus:ring-primary-500/30
    disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none
    ${getVariantClasses()}
    ${getSizeClasses()}
    ${getRoundedClasses()}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `
      .trim()
      .replace(/\s+/g, ' ')

    const defaultMotionProps: MotionProps = {
      whileHover: { scale: disabled || loading ? 1 : 1.02 },
      whileTap: { scale: disabled || loading ? 1 : 0.98 },
      transition: { type: 'spring', stiffness: 400, damping: 17 },
      ...motionProps,
    }

    const content = (
      <>
        {loading && (
          <div className={getIconSize()}>
            <ButtonLoader />
          </div>
        )}
        {!loading && leftIcon && (
          <span className={getIconSize()}>{leftIcon}</span>
        )}
        <span className={loading ? 'opacity-70' : ''}>
          {loading && loadingText ? loadingText : children}
        </span>
        {!loading && rightIcon && (
          <span className={getIconSize()}>{rightIcon}</span>
        )}
      </>
    )

    if (animate) {
      return (
        <motion.button
          ref={ref}
          className={baseClasses}
          disabled={disabled || loading}
          {...defaultMotionProps}
          onClick={props.onClick}
          type={props.type}
          form={props.form}
          name={props.name}
          value={props.value}
        >
          {content}
        </motion.button>
      )
    }

    return (
      <button
        ref={ref}
        className={baseClasses}
        disabled={disabled || loading}
        {...props}
      >
        {content}
      </button>
    )
  },
)

Button.displayName = 'Button'

// Specialized button variants
export const PrimaryButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'>
>((props, ref) => <Button ref={ref} variant="primary" {...props} />)

export const SecondaryButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'>
>((props, ref) => <Button ref={ref} variant="secondary" {...props} />)

export const OutlineButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'>
>((props, ref) => <Button ref={ref} variant="outline" {...props} />)

export const GhostButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'>
>((props, ref) => <Button ref={ref} variant="ghost" {...props} />)

export const DangerButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'>
>((props, ref) => <Button ref={ref} variant="danger" {...props} />)

export const SuccessButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'>
>((props, ref) => <Button ref={ref} variant="success" {...props} />)

export const GradientButton = forwardRef<
  HTMLButtonElement,
  Omit<ButtonProps, 'variant'>
>((props, ref) => <Button ref={ref} variant="gradient" {...props} />)

// Button group component
export interface ButtonGroupProps {
  children: React.ReactNode
  orientation?: 'horizontal' | 'vertical'
  spacing?: 'none' | 'sm' | 'md' | 'lg'
  className?: string
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  children,
  orientation = 'horizontal',
  spacing = 'sm',
  className = '',
}) => {
  const getSpacingClasses = () => {
    const isVertical = orientation === 'vertical'
    switch (spacing) {
      case 'none':
        return ''
      case 'sm':
        return isVertical ? 'space-y-2' : 'space-x-2'
      case 'md':
        return isVertical ? 'space-y-4' : 'space-x-4'
      case 'lg':
        return isVertical ? 'space-y-6' : 'space-x-6'
      default:
        return isVertical ? 'space-y-2' : 'space-x-2'
    }
  }

  const orientationClasses =
    orientation === 'vertical' ? 'flex-col' : 'flex-row'

  return (
    <div
      className={`flex ${orientationClasses} ${getSpacingClasses()} ${className}`}
    >
      {children}
    </div>
  )
}

export default Button
