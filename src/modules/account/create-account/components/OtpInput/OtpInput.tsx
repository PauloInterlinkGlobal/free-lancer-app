'use client';

import { Button } from '@/core/components/Button';
import { CheckCircle2, Loader2, RefreshCw } from 'lucide-react';
import React, { useEffect, useRef } from 'react';

export interface OtpInputProps {
  value: string;
  onChange: (value: string) => void;
  onComplete?: (value: string) => void;
  length?: number;
  error?: string;
  disabled?: boolean;
  isLoading?: boolean;
  loadingText?: string;
  successText?: string;
  helpText?: string;
  onResend?: () => void;
  isResending?: boolean;
  resendText?: string;
}

export function OtpInput({
  value = '',
  onChange,
  onComplete,
  length = 6,
  error,
  disabled = false,
  isLoading = false,
  loadingText = 'A validar o código...',
  successText = 'Código completo! A avançar...',
  helpText = 'Não recebeu o código?',
  onResend,
  isResending = false,
  resendText = 'Reenviar código',
}: OtpInputProps) {
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const digits = Array.from({ length }, (_, i) => value?.[i] || '');

  useEffect(() => {
    const firstEmptyIndex = digits.findIndex((d) => !d);
    const targetIndex = firstEmptyIndex === -1 ? 0 : firstEmptyIndex;
    inputsRef.current[targetIndex]?.focus();
  }, []);

  const updateCode = (newDigits: string[]) => {
    const newCode = newDigits.join('');
    onChange(newCode);

    if (newCode.length === length && !newDigits.includes('')) {
      setTimeout(() => {
        onComplete?.(newCode);
      }, 150);
    }
  };

  const handleChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const val = e.target.value;
    const cleanDigits = val.replace(/\D/g, '');

    if (!cleanDigits) {
      const updated = [...digits];
      updated[index] = '';
      updateCode(updated);
      return;
    }

    if (cleanDigits.length === 1) {
      const updated = [...digits];
      updated[index] = cleanDigits;
      updateCode(updated);

      if (index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }
    } else {
      handleFillDigits(cleanDigits, index);
    }
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === 'Backspace') {
      if (!digits[index] && index > 0) {
        const updated = [...digits];
        updated[index - 1] = '';
        updateCode(updated);
        inputsRef.current[index - 1]?.focus();
      } else {
        const updated = [...digits];
        updated[index] = '';
        updateCode(updated);
      }
    } else if (e.key === 'ArrowLeft' && index > 0) {
      e.preventDefault();
      inputsRef.current[index - 1]?.focus();
    } else if (e.key === 'ArrowRight' && index < length - 1) {
      e.preventDefault();
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleFillDigits = (rawCode: string, startIndex = 0) => {
    const clean = rawCode.replace(/\D/g, '');
    if (!clean) return;

    const updated = [...digits];
    for (let i = 0; i < clean.length && startIndex + i < length; i++) {
      updated[startIndex + i] = clean[i];
    }
    updateCode(updated);

    const nextIndex = Math.min(startIndex + clean.length, length - 1);
    inputsRef.current[nextIndex]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    handleFillDigits(pastedData, 0);
  };

  const isCodeComplete = value?.length === length;

  return (
    <div className="p-6 sm:p-8 rounded-2xl flex flex-col items-center gap-6">
      {/* 6 Inputs Grid */}
      <div className="flex items-center justify-center gap-2 sm:gap-3 w-full max-w-md">
        {digits.map((digit, idx) => {
          const hasError = !!error;
          const isFilled = !!digit;

          return (
            <input
              key={idx}
              ref={(el) => {
                inputsRef.current[idx] = el;
              }}
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(idx, e)}
              onKeyDown={(e) => handleKeyDown(idx, e)}
              onPaste={handlePaste}
              onFocus={(e) => e.target.select()}
              disabled={disabled || isLoading}
              aria-label={`Dígito ${idx + 1} do código`}
              className={`w-11 h-14 sm:w-14 sm:h-16 text-center text-xl sm:text-2xl font-bold font-mono rounded-2xl border-2 transition-all outline-none select-none disabled:opacity-60 disabled:cursor-not-allowed ${
                hasError
                  ? 'border-rose-500 bg-rose-500/5 text-rose-600 focus:ring-2 focus:ring-rose-500/20'
                  : isFilled
                    ? 'border-primary/60 bg-surface text-primary-content shadow-xs'
                    : 'border-border-ui bg-surface text-text-primary focus:border-primary focus:ring-4 focus:ring-primary/10'
              }`}
            />
          );
        })}
      </div>

      {/* Status / Error feedback */}
      {error ? (
        <p className="text-xs font-medium text-rose-500 text-center animate-in fade-in duration-200">
          {error}
        </p>
      ) : isLoading ? (
        <div className="flex items-center gap-2 text-xs font-medium text-primary animate-pulse">
          <Loader2 className="w-4 h-4 animate-spin" />
          <span>{loadingText}</span>
        </div>
      ) : isCodeComplete && successText ? (
        <div className="flex items-center gap-1.5 text-xs font-medium text-emerald-600 dark:text-emerald-400 animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4" />
          <span>{successText}</span>
        </div>
      ) : null}

      {/* Resend button */}
      {onResend && (
        <div className="flex items-center justify-between w-full pt-2 border-t border-divider text-xs">
          <span className="text-text-muted">{helpText}</span>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={onResend}
            isLoading={isResending}
            disabled={disabled || isLoading}
            leftIcon={RefreshCw}
          >
            {resendText}
          </Button>
        </div>
      )}
    </div>
  );
}

export default OtpInput;
