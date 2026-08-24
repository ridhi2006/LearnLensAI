import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';

export const ProgressBar = ({
  value = 0,
  max = 100,
  size = 'md',
  variant = 'brand',
  showLabel = false,
  label = '',
  className = '',
}) => {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const sizeStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  const gradientStyles = {
    brand: 'bg-gradient-to-r from-brand-indigo to-brand-violet',
    cyan: 'bg-gradient-to-r from-cyan-500 to-blue-500',
    success: 'bg-gradient-to-r from-emerald-500 to-accent-success',
    warning: 'bg-gradient-to-r from-amber-500 to-accent-warning',
    danger: 'bg-gradient-to-r from-rose-500 to-accent-error',
  };

  return (
    <div className={clsx('w-full', className)}>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-medium mb-1.5 text-text-secondary">
          <span>{label}</span>
          <span className="text-text-primary font-semibold">{percentage}%</span>
        </div>
      )}
      <div className={clsx('w-full bg-dark-600/90 rounded-full overflow-hidden p-0.5 border border-slate-800/80', sizeStyles[size])}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${percentage}%` }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className={clsx('h-full rounded-full', gradientStyles[variant])}
        />
      </div>
    </div>
  );
};
