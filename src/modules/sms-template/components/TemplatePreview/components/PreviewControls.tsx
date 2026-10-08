'use client';

import { Moon, Sun, ToggleLeft, ToggleRight, Zap } from 'lucide-react';
import React from 'react';

interface PreviewControlsProps {
  previewSender: string;
  setPreviewSender: (sender: string) => void;
  previewType: 'normal' | 'flash';
  setPreviewType: (type: 'normal' | 'flash') => void;
  previewTheme: 'light' | 'dark';
  setPreviewTheme: (theme: 'light' | 'dark') => void;
  fillVariables: boolean;
  toggleFillVariables: () => void;
}

export function PreviewControls({
  previewSender,
  setPreviewSender,
  previewType,
  setPreviewType,
  previewTheme,
  setPreviewTheme,
  fillVariables,
  toggleFillVariables,
}: PreviewControlsProps) {
  return (
    <div className="flex flex-col gap-2.5 rounded-xl border border-border-ui bg-surface p-3 text-xs shadow-sm">
      <div className="flex items-center justify-between gap-2">
        <label
          htmlFor="preview-sender-id"
          className="font-medium text-text-muted"
        >
          Sender ID:
        </label>
        <input
          id="preview-sender-id"
          type="text"
          value={previewSender}
          onChange={(e) => setPreviewSender(e.target.value)}
          className="w-28 rounded-md border border-border-ui bg-surface-raised px-2 py-1 text-right font-semibold text-text-primary outline-none focus:border-primary"
          placeholder="SMSillico"
        />
      </div>

      <div className="flex items-center justify-between border-t border-border-ui/40 pt-2">
        <span className="text-text-muted">Tema do visor:</span>
        <div className="flex gap-1 rounded-lg border border-border-ui bg-surface-raised p-0.5">
          <button
            type="button"
            onClick={() => setPreviewTheme('light')}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-medium transition-all ${
              previewTheme === 'light'
                ? 'bg-primary text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Sun className="h-3 w-3" />
            Claro
          </button>
          <button
            type="button"
            onClick={() => setPreviewTheme('dark')}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-medium transition-all ${
              previewTheme === 'dark'
                ? 'bg-neutral-800 text-white shadow-xs'
                : 'text-text-muted hover:text-text-primary'
            }`}
          >
            <Moon className="h-3 w-3" />
            Escuro
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-ui/40 pt-2">
        <span className="text-text-muted">Formato:</span>
        <div className="flex gap-1">
          <button
            type="button"
            onClick={() => setPreviewType('normal')}
            className={`rounded-md px-2 py-0.5 font-medium transition-all ${
              previewType === 'normal'
                ? 'bg-primary text-white'
                : 'text-text-muted hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            Normal
          </button>
          <button
            type="button"
            onClick={() => setPreviewType('flash')}
            className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-medium transition-all ${
              previewType === 'flash'
                ? 'bg-amber-500 text-white'
                : 'text-text-muted hover:bg-neutral-100 dark:hover:bg-neutral-800'
            }`}
          >
            <Zap className="h-3 w-3" />
            Flash
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-border-ui/40 pt-2">
        <span className="inline-flex items-center gap-1 text-text-muted">
          Simular Variáveis:
        </span>
        <button
          type="button"
          onClick={toggleFillVariables}
          className="inline-flex items-center gap-1 font-medium text-primary hover:underline"
        >
          {fillVariables ? (
            <>
              <ToggleRight className="h-5 w-5 text-primary" />
              Preenchidas
            </>
          ) : (
            <>
              <ToggleLeft className="h-5 w-5 text-neutral-400" />
              Tags Originais
            </>
          )}
        </button>
      </div>
    </div>
  );
}
