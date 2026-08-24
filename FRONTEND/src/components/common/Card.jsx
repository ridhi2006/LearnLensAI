import React from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const Card = ({
  children,
  className = '',
  hover = false,
  glow = false,
  padding = 'default',
  onClick,
  ...props
}) => {
  const paddingStyles = {
    none: 'p-0',
    sm: 'p-3.5 sm:p-4',
    default: 'p-5 sm:p-6',
    lg: 'p-6 sm:p-8',
  };

  return (
    <motion.div
      whileHover={hover ? { y: -3, transition: { duration: 0.2 } } : {}}
      onClick={onClick}
      className={twMerge(
        clsx(
          'relative rounded-2xl bg-dark-700/70 border border-slate-800/80 backdrop-blur-md transition-colors duration-200',
          hover && 'hover:border-brand-indigo/30 hover:shadow-xl hover:shadow-brand-indigo/5 cursor-pointer',
          glow && 'border-brand-indigo/30 shadow-lg shadow-brand-indigo/10',
          paddingStyles[padding],
          className
        )
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
