'use client';

import { Send } from 'lucide-react';
import React from 'react';

interface SmsFormActionsProps {
  loading?: boolean;
  canSend: boolean;
  scheduled: boolean;
}

export function SmsFormActions({
  loading = false,
  canSend,
  scheduled,
}: SmsFormActionsProps) {
  return (
    <div className="flex justify-end gap-3 border-t border-border-ui bg-background px-1 py-4">
      <button
        type="button"
        disabled={loading}
        className="inline-flex h-10 items-center rounded-lg border border-border-ui bg-surface px-5 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover disabled:pointer-events-none disabled:opacity-50"
      >
        Guardar
      </button>

      <button
        type="submit"
        disabled={!canSend}
        className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
      >
        <Send size={16} aria-hidden />
        {loading
          ? scheduled
            ? 'A agendar...'
            : 'A enviar...'
          : scheduled
            ? 'Agendar'
            : 'Enviar agora'}
      </button>
    </div>
  );
}
