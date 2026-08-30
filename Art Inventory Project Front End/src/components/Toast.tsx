import { useToast } from '../context/ToastContext';
import './Toast.css';

const Toast = () => {
  const { toasts } = useToast();

  // If there are no toasts, render nothing
  if (toasts.length === 0) return null;

  return (
    <div className="toast-container">
      {toasts.map((toast) => (
        <div key={toast.id} className={`toast toast-${toast.type}`}>

          {/* Icon changes based on type */}
          <span className="toast-icon">
            {toast.type === 'success' && '✓'}
            {toast.type === 'error'   && '✕'}
            {toast.type === 'info'    && 'i'}
          </span>

          <span className="toast-message">{toast.message}</span>

        </div>
      ))}
    </div>
  );
};

export default Toast;