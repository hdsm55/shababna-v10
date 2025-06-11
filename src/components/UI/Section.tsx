import React, { HTMLAttributes, ReactNode } from 'react';

export interface SectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  containerClassName?: string;
}

export const Section: React.FC<SectionProps> = ({
  children,
  className = '',
  containerClassName = '',
  ...props
}) => {
  return (
    <section className={`section ${className}`} {...props}>
      <div className={`container mx-auto ${containerClassName}`}>
        {children}
      </div>
    </section>
  );
};