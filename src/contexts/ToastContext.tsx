import { createContext, useContext, ReactNode } from 'react';
import { useToast } from '../hooks/useToast';

interface ToastContextType {
  showToast: (message: string, type?: 'success' | 'error' | 'info') => string;
  showSuccess: (message: string) => string;
  showError: (message: string) => string;
  toasts: Array<{ id: string; message: string; type: 'success' | 'error' | 'info' }>;
  removeToast: (id: string) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
    </ToastContext.Provider>
  );
};

export const useToastContext = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToastContext must be used within ToastProvider');
  }
  return context;
};



