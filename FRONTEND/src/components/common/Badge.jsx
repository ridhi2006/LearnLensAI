import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Badge = ({
  children,
  variant = 'default',
  size = 'md',
  dot = false,
  icon,
  className = '',
}) => {
  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 gap-1 font-medium',
    md: 'text-xs px-2.5 py-1 gap-1.5 font-medium',
    lg: 'text-sm px-3 py-1.5 gap-2 font-semibold',
  };

  const variantStyles = {
    default: 'bg-dark-600/80 text-text-secondary border border-border-subtle',
    primary: 'bg-brand-indigo/15 text-brand-lightViolet border border-brand-indigo/30',
    cyan: 'bg-brand-cyan/15 text-brand-cyan border border-brand-cyan/30',
    success: 'bg-accent-success/15 text-accent-success border border-accent-success/30',
    warning: 'bg-accent-warning/15 text-accent-warning border border-accent-warning/30',
    danger: 'bg-accent-error/15 text-accent-error border border-accent-error/30',
    neutral: 'bg-slate-800/80 text-slate-300 border border-slate-700/50',
    gradient: 'bg-gradient-to-r from-brand-indigo/20 to-brand-violet/20 text-brand-lightViolet border border-brand-indigo/35 shadow-sm',
  };

  const dotColors = {
    default: 'bg-text-muted',
    primary: 'bg-brand-indigo',
    cyan: 'bg-brand-cyan',
    success: 'bg-accent-success',
    warning: 'bg-accent-warning',
    danger: 'bg-accent-error',
    neutral: 'bg-slate-400',
    gradient: 'bg-brand-lightViolet',
  };

  return (
    <span
      className={twMerge(
        clsx(
          'inline-flex items-center rounded-full transition-colors',
          sizeStyles[size],
          variantStyles[variant],
          className
        )
      )}
    >
      {dot && <span className={clsx('w-1.5 h-1.5 rounded-full shrink-0', dotColors[variant])} />}
      {icon && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
