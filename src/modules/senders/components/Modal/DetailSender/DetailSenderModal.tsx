'use client';

import { Modal } from '@/core/components/Modal';
import { useRouter } from '@/core/i18n/navigation';
import { useModalStore } from '@/core/store/useModalStore';
import { senderStatusLabel } from '@/modules/senders/constants/senders';
import { ISender, SenderStatus } from '@/modules/senders/interfaces/senders';
import {
  AlertCircle,
  BadgeCheck,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Send,
} from 'lucide-react';

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

const statusBadgeBgs: Record<SenderStatus, string> = {
  validated: 'text-emerald-600 dark:text-emerald-400 ',
  pending: 'text-amber-600 dark:text-amber-400 ',
  rejected: 'text-rose-600 dark:text-rose-400',
};

const statusIcons: Record<SenderStatus, typeof CheckCircle2> = {
  validated: CheckCircle2,
  pending: Clock,
  rejected: AlertCircle,
};

interface DetailSenderModalProps {
  sender?: ISender | null;
  onClose?: () => void;
}

export function DetailSenderModal({ sender, onClose }: DetailSenderModalProps) {
  const { closeModal } = useModalStore();
  const router = useRouter();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  if (!sender) return null;

  const StatusIcon = statusIcons[sender.status] || CheckCircle2;
  const initials = sender.sender.trim().slice(0, 2).toUpperCase() || 'ID';

  const rows = [
    {
      icon: Calendar,
      label: 'Data de criação',
      value: formatDate(sender.createdAt),
    },
    {
      icon: CheckCircle2,
      label: 'Data de validação',
      value: formatDate(sender.validatedAt),
    },
  ];

  const handleSend = () => {
    handleClose();
    router.push('/send-sms');
  };

  return (
    <Modal id="DETAIL_SENDER" onClose={handleClose}>
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border-ui bg-surface shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-primary">
              <BadgeCheck className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-primary-content">
                Detalhes do Remetente
              </h2>
              <p className="text-xs text-muted-content">
                Informações do Sender ID registado
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 p-5">
          {/* Identity */}
          <div className="flex flex-col items-center gap-3 px-4 py-5 text-center">
            <div className="min-w-0 max-w-full">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-content">
                Sender ID
              </span>
              <h3 className="truncate text-lg font-semibold tracking-wide text-primary-content">
                {sender.sender}
              </h3>
            </div>
            <div
              className={`inline-flex items-center gap-1.5s px-2.5 py-0.5 text-xs font-medium ${statusBadgeBgs[sender.status]}`}
            >
              <StatusIcon className="h-3.5 w-3.5" />
              <span>{senderStatusLabel[sender.status]}</span>
            </div>
          </div>

          {/* Metadata */}
          <dl className="flex flex-col rounded-xl border border-border-ui">
            {rows.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-3 px-3.5 py-3 ${
                  i > 0 ? 'border-t border-dashed border-border-ui' : ''
                }`}
              >
                <dt className="flex items-center gap-2.5 text-xs text-muted-content">
                  <span className="flex h-7 w-7 items-center justify-center  text-primary">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </dt>
                <dd className="text-sm font-medium text-primary-content">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Description */}
          <div className="flex flex-col gap-2 rounded-xl border border-border-ui p-3.5">
            <div className="flex items-center gap-2 text-muted-content">
              <FileText className="h-4 w-4" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                Descrição
              </span>
            </div>
            <p className="text-sm leading-relaxed text-secondary-content">
              {sender.description || (
                <span className="italic text-muted-content">
                  Nenhuma descrição fornecida para este remetente.
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-dashed border-border-ui pt-4">
            {sender.status === 'validated' && (
              <button
                type="button"
                onClick={handleSend}
                className="inline-flex items-center gap-2 m-auto rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <Send className="h-4 w-4" />
                Enviar SMS
              </button>
            )}
            <button
              type="button"
              onClick={handleClose}
              aria-label="Fechar"
              className="inline-flex items-center gap-2 m-auto rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Cancelar{' '}
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
