import React, { createContext, useContext, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertTriangle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback(({ title, message, type = 'success', duration = 4000 }) => {
    const id = Date.now() + Math.random().toString();
    const newToast = { id, title, message, type };

    setToasts((prev) => [...prev, newToast]);

    if (duration > 0) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, duration);
    }
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      {/* Floating Toasts Container */}
      <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2.5 pointer-events-none max-w-md w-full px-4">
        <AnimatePresence>
          {toasts.map((toast) => {
            const icons = {
              success: <CheckCircle2 className="w-5 h-5 text-accent-success shrink-0" />,
              warning: <AlertTriangle className="w-5 h-5 text-accent-warning shrink-0" />,
              error: <AlertCircle className="w-5 h-5 text-accent-error shrink-0" />,
              info: <Info className="w-5 h-5 text-brand-cyan shrink-0" />,
            };

            const borderColors = {
              success: 'border-accent-success/30',
              warning: 'border-accent-warning/30',
              error: 'border-accent-error/30',
              info: 'border-brand-cyan/30',
            };

            return (
              <motion.div
                key={toast.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.15 } }}
                className={`pointer-events-auto flex items-start gap-3 p-4 rounded-xl bg-dark-700/95 backdrop-blur-xl border ${borderColors[toast.type] || 'border-brand-indigo/30'} shadow-2xl shadow-black/80 text-text-primary`}
              >
                {icons[toast.type] || icons.info}
                <div className="flex-1 min-w-0">
                  {toast.title && (
                    <h5 className="font-semibold text-sm text-text-primary tracking-wide">
                      {toast.title}
                    </h5>
                  )}
                  <p className="text-xs text-text-secondary mt-0.5 leading-relaxed">
                    {toast.message}
                  </p>
                </div>
                <button
                  onClick={() => removeToast(toast.id)}
                  className="text-text-muted hover:text-text-primary p-1 rounded transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
