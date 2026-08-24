import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  className = '',
  onClick,
  type = 'button',
  ...props
}) => {
  const baseStyles = 'relative inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-indigo/50 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5 font-semibold',
  };

  const variantStyles = {
    primary: 'bg-gradient-to-r from-brand-indigo via-brand-violet to-brand-violet text-white shadow-lg shadow-brand-indigo/25 hover:shadow-brand-indigo/40 hover:brightness-110 active:scale-[0.98]',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-text-primary border border-border-subtle hover:border-brand-indigo/40 shadow-sm active:scale-[0.98]',
    outline: 'bg-transparent hover:bg-dark-700/50 text-text-secondary hover:text-text-primary border border-border-subtle hover:border-text-muted active:scale-[0.98]',
    ghost: 'bg-transparent hover:bg-dark-700/40 text-text-secondary hover:text-text-primary active:scale-[0.98]',
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-600 text-dark-950 font-semibold shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/35 hover:brightness-110 active:scale-[0.98]',
    danger: 'bg-accent-error/15 text-accent-error hover:bg-accent-error/25 border border-accent-error/30 active:scale-[0.98]',
  };

  return (
    <motion.button
      type={type}
      whileHover={!disabled && !isLoading ? { y: -1 } : {}}
      whileTap={!disabled && !isLoading ? { scale: 0.98 } : {}}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={twMerge(clsx(baseStyles, sizeStyles[size], variantStyles[variant], className))}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin text-current" />}
      {!isLoading && leftIcon && <span className="shrink-0 transition-transform group-hover:-translate-x-0.5">{leftIcon}</span>}
      <span>{children}</span>
      {!isLoading && rightIcon && <span className="shrink-0 transition-transform group-hover:translate-x-0.5">{rightIcon}</span>}
    </motion.button>
  );
};
