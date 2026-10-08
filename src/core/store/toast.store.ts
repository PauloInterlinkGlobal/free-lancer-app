import { create } from 'zustand';

type ToastType = 'success' | 'error';

type State = {
  toast: {
    id: number;
    message: string;
    type: ToastType;
  } | null;
  timeoutId: ReturnType<typeof setTimeout> | null;
};

type Action = {
  showToast: (message: string, type?: ToastType, duration?: number) => void;
  success: (message: string, duration?: number) => void;
  error: (message: string, duration?: number) => void;
  close: () => void;
};

export const useToastStore = create<State & Action>((set, get) => ({
  toast: null,
  timeoutId: null,

  showToast: (message, type = 'success', duration = 4000) => {
    const { timeoutId } = get();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    const newId = Date.now();
    set({
      toast: { id: newId, message, type },
    });

    if (duration > 0) {
      const newTimeoutId = setTimeout(() => {
        set((state) => {
          if (state.toast?.id === newId) {
            return { toast: null, timeoutId: null };
          }
          return state;
        });
      }, duration);

      set({ timeoutId: newTimeoutId });
    }
  },

  success: (message, duration) => get().showToast(message, 'success', duration),

  error: (message, duration) => get().showToast(message, 'error', duration),

  close: () => {
    const { timeoutId } = get();
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    set({ toast: null, timeoutId: null });
  },
}));
