'use client';

import React from 'react';
import { SmsInfo } from '../types';

interface SmsSummaryCardProps {
  totalRecipients: number;
  info: SmsInfo;
}

export function SmsSummaryCard({ totalRecipients, info }: SmsSummaryCardProps) {
  return (
    <div className="rounded-lg border border-border-ui bg-surface p-4">
      <h3 className="mb-4 text-sm font-semibold text-primary-content">
        RESUMO DO ENVIO
      </h3>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="min-w-0">
          <p className="whitespace-nowrap text-xs text-muted-content">
            Número de destinatários
          </p>
          <p className="mt-1 truncate text-sm font-medium text-primary-content">
            {totalRecipients} contacto{totalRecipients === 1 ? '' : 's'}
          </p>
        </div>

        <div className="min-w-0">
          <p className="whitespace-nowrap text-xs text-muted-content">
            Número de caracteres
          </p>
          <p className="mt-1 truncate text-sm font-medium text-primary-content">
            {info.length} carácter{info.length === 1 ? '' : 'es'}
          </p>
        </div>

        <div className="min-w-0">
          <p className="whitespace-nowrap text-xs text-muted-content">
            Número de páginas SMS
          </p>
          <p className="mt-1 truncate text-sm font-medium text-primary-content">
            {info.segments} página{info.segments === 1 ? '' : 's'}
          </p>
        </div>

        <div className="min-w-0">
          <p className="whitespace-nowrap text-xs text-muted-content">
            Volume de SMS necessário
          </p>
          <p className="mt-1 truncate text-sm font-medium text-primary-content">
            {info.segments * totalRecipients} SMS
          </p>
        </div>
      </div>
    </div>
  );
}
