import React from 'react';
import { clsx } from 'clsx';

export const Skeleton = ({ className = '', rounded = 'rounded-lg' }) => {
  return (
    <div
      className={clsx(
        'animate-pulse bg-dark-600/70 relative overflow-hidden',
        rounded,
        className
      )}
    >
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
    </div>
  );
};
