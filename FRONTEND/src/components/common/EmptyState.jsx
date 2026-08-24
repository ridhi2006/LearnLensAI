import React from 'react';
import { Button } from './Button';

export const EmptyState = ({
  icon,
  title,
  description,
  actionLabel,
  onAction,
  className = '',
}) => {
  return (
    <div className={`flex flex-col items-center justify-center text-center p-8 sm:p-12 rounded-2xl bg-dark-800/40 border border-dashed border-slate-800 ${className}`}>
      {icon && (
        <div className="w-14 h-14 rounded-2xl bg-brand-indigo/10 border border-brand-indigo/20 flex items-center justify-center text-brand-indigo mb-4 shadow-inner">
          {icon}
        </div>
      )}
      <h4 className="text-lg font-semibold text-text-primary mb-1.5">{title}</h4>
      <p className="text-xs sm:text-sm text-text-muted max-w-sm mb-6 leading-relaxed">
        {description}
      </p>
      {actionLabel && onAction && (
        <Button variant="primary" size="sm" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
