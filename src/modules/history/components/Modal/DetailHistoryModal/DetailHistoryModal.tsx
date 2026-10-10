'use client';

import { Modal } from '@/core/components/Modal';
import { useModalStore } from '@/core/store/useModalStore';
import { smsTypeLabel } from '@/modules/history/constants/history';
import {
  HistorySmsType,
  IHistorySms,
} from '@/modules/history/interfaces/history';
import {
  Calendar,
  FileText,
  Hash,
  History as HistoryIcon,
  PencilLine,
  Users,
  X,
} from 'lucide-react';

const smsTypeStyles: Record<HistorySmsType, string> = {
  immediate: 'text-primary',
  scheduled: 'text-secondary',
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

interface DetailHistoryModalProps {
  sms?: IHistorySms | null;
  onClose?: () => void;
}

export function DetailHistoryModal({ sms, onClose }: DetailHistoryModalProps) {
  const { closeModal } = useModalStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  if (!sms) return null;

  const stats = [
    {
      icon: Users,
      label: 'Destinatários',
      value: sms.recipients.toLocaleString('pt-PT'),
    },
    {
      icon: Hash,
      label: 'SMS usados',
      value: sms.smsUsed.toLocaleString('pt-PT'),
    },
    {
      icon: PencilLine,
      label: 'Data de edição',
      value: formatDate(sms.editionDate),
    },
    {
      icon: Calendar,
      label: 'Data de envio',
      value: formatDate(sms.sendingDate),
    },
  ];

  return (
    <Modal id="DETAIL_HISTORY_SMS" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-ui bg-surface px-3 pb-4 shadow-sm">
        {/* Header */}
        <div className="mb-3 flex h-16 items-center justify-between border-b border-dashed border-border-ui pl-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center">
              <HistoryIcon className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-medium text-primary-content">
                Detalhes do Envio
              </h2>
              <p className="truncate text-xs text-muted-content">
                Informações e conteúdo da mensagem enviada
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 rounded-xl bg-surface-raised px-3 py-2.5">
            <div className="flex min-w-0 flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-content">
                Sender ID
              </span>
              <h3 className="truncate text-sm font-medium text-primary-content">
                {sms.sender || 'Padrão / Não definido'}
              </h3>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${smsTypeStyles[sms.smsType]}`}
              >
                {smsTypeLabel[sms.smsType]}
              </span>
            </div>
          </div>

          {/* Estatísticas */}
          <dl className="flex flex-col rounded-xl border border-border-ui">
            {stats.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-3 px-2.5 py-2 ${
                  i > 0 ? 'border-t border-dashed border-border-ui' : ''
                }`}
              >
                <dt className="flex items-center gap-2.5 text-sm text-secondary-content">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </span>
                  {label}
                </dt>
                <dd className="truncate text-sm font-medium text-primary-content">
                  {value}
                </dd>
              </div>
            ))}
          </dl>

          {/* Conteúdo */}
          <div className="flex flex-col gap-2 rounded-xl border border-border-ui p-3">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <FileText className="h-5 w-5 text-primary" />
              </span>
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-content">
                Conteúdo da Mensagem
              </span>
            </div>
            <div className="max-h-48 overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-surface-raised p-3 text-sm leading-relaxed text-secondary-content">
              {sms.content || 'Nenhum conteúdo definido.'}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DetailHistoryModal;
