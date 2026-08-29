import { useState, useContext, createContext } from 'react';

// The shape of a single toast message
type Toast = {
  id: number;
  message: string;
  type: 'success' | 'error' | 'info';
};

// What the context exposes to components
type ToastContextType = {
  toasts: Toast[];
  toast: {
    success: (message: string) => void;
    error: (message: string) => void;
    info: (message: string) => void;
  };
};

const ToastContext = createContext<ToastContextType | null>(null);

// A counter to give each toast a unique ID
let toastId = 0;

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {

  const [toasts, setToasts] = useState<Toast[]>([]);

  // Adds a new toast to the list and removes it after 4 seconds
  const addToast = (message: string, type: Toast['type']) => {
    const id = ++toastId;

    setToasts((prev) => [...prev, { id, message, type }]);

    // Automatically remove the toast after 4 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  };

  // Convenience methods so components can call toast.success() etc
  const toast = {
    success: (message: string) => addToast(message, 'success'),
    error: (message: string) => addToast(message, 'error'),
    info: (message: string) => addToast(message, 'info'),
  };

  return (
    <ToastContext.Provider value={{ toasts, toast }}>
      {children}
    </ToastContext.Provider>
  );
};

// Custom hook — components call this to access the toast functions
export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used inside <ToastProvider>');
  return ctx;
};