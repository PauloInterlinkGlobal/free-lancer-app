'use client';
import { useToastStore } from '@/core/store/toast.store';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckCircle2, X, XCircle } from 'lucide-react';

const Toaster = () => {
  const { toast, close } = useToastStore();

  const toastConfig = {
    success: {
      bgColor: 'bg-emerald-600 border-emerald-500/40 text-white',
      icon: <CheckCircle2 className="w-5 h-5 text-white flex-shrink-0" />,
    },
    error: {
      bgColor: 'bg-red-600 border-red-500/40 text-white',
      icon: <XCircle className="w-5 h-5 text-white flex-shrink-0" />,
    },
  };

  return (
    <AnimatePresence>
      {toast && (
        <div className="fixed top-14 left-0 md:left-auto right-1 md:right-10 z-[9999] flex justify-center md:justify-start px-2 md:px-0 max-w-full md:max-w-md pointer-events-none">
          <motion.div
            key={toast.id}
            initial={{ y: -30, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -30, opacity: 0, scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 350, damping: 28 }}
            className={`pointer-events-auto flex w-full max-w-xl items-center justify-between rounded-2xl border px-2 py-2 shadow-2xl backdrop-blur-md ${
              toastConfig[toast.type]?.bgColor ||
              'bg-gray-800 text-white border-gray-700'
            }`}
          >
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {toastConfig[toast.type]?.icon}
              <p className="text-sm font-medium leading-snug truncate">
                {toast.message}
              </p>
            </div>

            <button
              onClick={close}
              className="ml-3 flex-shrink-0 rounded-lg p-1 text-white/80 hover:text-white hover:bg-white/20 transition-colors focus:outline-none"
              aria-label="Fechar notificação"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default Toaster;
