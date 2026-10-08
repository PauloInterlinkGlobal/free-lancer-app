'use client';

import React from 'react';
import { SmsInfo } from '../types';

interface SmsMessageFieldProps {
  message: string;
  onChange: (message: string) => void;
  info: SmsInfo;
}

export function SmsMessageField({
  message,
  onChange,
  info,
}: SmsMessageFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label
        htmlFor="sms-message"
        className="text-sm font-medium text-primary-content"
      >
        Mensagem
      </label>
      <textarea
        id="sms-message"
        rows={7}
        value={message}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Escreva a sua mensagem..."
        className="w-full rounded-lg border border-border-ui bg-surface px-3 py-2 text-sm text-primary-content outline-none transition-colors placeholder:text-muted-content focus:border-primary resize-y"
      />
      <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-muted-content">
        <span>
          {info.length} caracteres · {info.segments} SMS
        </span>
        {!info.isGsm && (
          <span className="text-amber-500">
            Contém caracteres especiais: limite de 70 por SMS.
          </span>
        )}
      </div>
    </div>
  );
}
