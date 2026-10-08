'use client';

import React from 'react';
import { SmsType } from '../../../interfaces';
import { SMS_TYPES } from '../utils/smsInfo';

interface SmsTypeSelectorProps {
  type: SmsType;
  onChange: (type: SmsType) => void;
}

export function SmsTypeSelector({ type, onChange }: SmsTypeSelectorProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-sm font-medium text-primary-content">
        Tipo de mensagem
      </span>
      <div className="inline-flex w-fit rounded-lg border border-border-ui bg-surface p-1">
        {SMS_TYPES.map(({ value, label }) => {
          const active = type === value;
          return (
            <button
              key={value}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(value)}
              className={`inline-flex h-8 items-center gap-2 rounded-md px-4 text-sm font-medium transition-colors ${
                active
                  ? 'bg-primary text-white'
                  : 'text-muted-content hover:bg-item-hover hover:text-primary-content'
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
      {type === 'flash' && (
        <p className="text-xs text-muted-content">
          A mensagem flash aparece direto no ecrã do destinatário e não fica
          guardada.
        </p>
      )}
    </div>
  );
}
