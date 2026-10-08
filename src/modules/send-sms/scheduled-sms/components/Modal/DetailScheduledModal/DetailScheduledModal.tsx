'use client';

import { Modal } from '@/core/components/Modal';
import { useRouter } from '@/core/i18n/navigation';
import { useModalStore } from '@/core/store/useModalStore';
import { sendingTypeLabel } from '@/modules/send-sms/scheduled-sms/constants/scheduled-sms';
import {
  IScheduledSms,
  SendingType,
} from '@/modules/send-sms/scheduled-sms/interfaces/scheduled-sms';
import { CalendarClock, FileText, Pencil, Send, Users, X } from 'lucide-react';
import React from 'react';

const sendingTypeStyles: Record<SendingType, string> = {
  normal: 'bg-primary/10 text-primary',
  flash: 'bg-secondary/10 text-secondary',
};

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Africa/Luanda',
});

const formatDate = (iso?: string | null) => {
  if (!iso) return '—';
  try {
    return dateFormatter.format(new Date(iso));
  } catch {
    return '—';
  }
};

interface DetailScheduledModalProps {
  scheduled?: IScheduledSms | null;
  onClose?: () => void;
}

export function DetailScheduledModal({
  scheduled,
  onClose,
}: DetailScheduledModalProps) {
  const { closeModal } = useModalStore();
  const router = useRouter();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleEdit = () => {
    if (!scheduled) return;
    handleClose();
    router.push(`/send-sms?scheduled=${scheduled.id}`);
  };

  if (!scheduled) return null;

  return (
    <Modal id="DETAIL_SCHEDULED_SMS" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-divider px-6 py-5">
          <div>
            <h2 className="text-lg font-semibold text-primary-content">
              Detalhes do SMS Agendado
            </h2>
            <p className="mt-1 text-xs text-muted-content">
              Informações do agendamento e destinatários programados.
            </p>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-5 p-6">
          {/* Top Badges Card */}
          <div className="flex items-center justify-between rounded-xl border border-border-ui bg-surface-raised p-4">
            <div className="flex flex-col">
              <span className="text-xs font-medium uppercase tracking-wider text-muted-content">
                Referência
              </span>
              <h3 className="font-mono text-base font-bold tracking-tight text-primary-content">
                {scheduled.reference}
              </h3>
            </div>

            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold ${sendingTypeStyles[scheduled.sendingType]}`}
            >
              {sendingTypeLabel[scheduled.sendingType]}
            </span>
          </div>

          {/* Grid Stats */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-start gap-3 rounded-xl border border-border-ui p-3.5">
              <Send size={18} className="mt-0.5 text-muted-content shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-muted-content truncate">
                  Sender ID
                </span>
                <span className="text-sm font-semibold text-primary-content truncate">
                  {scheduled.sender || 'Padrão'}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border-ui p-3.5">
              <Users size={18} className="mt-0.5 text-muted-content shrink-0" />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-muted-content truncate">
                  Destinatários
                </span>
                <span className="text-sm font-semibold text-primary-content">
                  {scheduled.recipients.toLocaleString('pt-PT')}
                </span>
              </div>
            </div>

            <div className="flex items-start gap-3 rounded-xl border border-border-ui p-3.5">
              <CalendarClock
                size={18}
                className="mt-0.5 text-muted-content shrink-0"
              />
              <div className="flex flex-col min-w-0">
                <span className="text-xs text-muted-content truncate">
                  Data Programada
                </span>
                <span className="text-xs font-semibold text-primary-content truncate">
                  {formatDate(scheduled.editionDate)}
                </span>
              </div>
            </div>
          </div>

          {/* Message Content */}
          <div className="flex flex-col gap-1.5 rounded-xl border border-border-ui p-4">
            <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider text-muted-content">
              <FileText size={14} />
              <span>Conteúdo do Disparo</span>
            </div>
            <div className="mt-1 rounded-lg bg-surface-raised p-3.5 text-sm leading-relaxed text-primary-content whitespace-pre-wrap break-words font-mono">
              {scheduled.content || 'Nenhum conteúdo definido.'}
            </div>
          </div>

          {/* Actions Footer */}
          <div className="mt-2 flex items-center justify-between border-t border-divider pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-border-ui bg-surface px-4 py-2 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
            >
              Fechar
            </button>

            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Pencil size={16} />
              Editar Agendamento
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DetailScheduledModal;
