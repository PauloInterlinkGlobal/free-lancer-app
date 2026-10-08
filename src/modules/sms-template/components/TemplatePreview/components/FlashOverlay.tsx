'use client';

import React from 'react';

interface FlashOverlayProps {
  previewSender: string;
  renderedContent: string;
  theme?: 'light' | 'dark';
}

export function FlashOverlay({
  previewSender,
  renderedContent,
  theme = 'light',
}: FlashOverlayProps) {
  const isDark = theme === 'dark';

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-black/50 px-4 backdrop-blur-xs">
      <div
        className={`w-full overflow-hidden rounded-2xl p-4 text-center shadow-2xl backdrop-blur-xl border ${
          isDark
            ? 'bg-neutral-900/95 border-neutral-700 text-white'
            : 'bg-white/95 border-neutral-200 text-neutral-900'
        }`}
      >
        <span className="mb-1 block text-xs font-bold uppercase tracking-wider text-amber-500">
          Mensagem Flash
        </span>
        <p
          className={`mb-2 text-xs font-bold ${
            isDark ? 'text-white' : 'text-neutral-900'
          }`}
        >
          {previewSender}
        </p>
        <p
          className={`max-h-36 overflow-y-auto whitespace-pre-wrap text-xs ${
            isDark ? 'text-neutral-300' : 'text-neutral-600'
          }`}
        >
          {renderedContent || 'Sua mensagem flash aparecerá aqui'}
        </p>
        <button
          type="button"
          className="mt-3 w-full rounded-lg bg-primary py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-primary/90"
        >
          OK
        </button>
      </div>
    </div>
  );
}
