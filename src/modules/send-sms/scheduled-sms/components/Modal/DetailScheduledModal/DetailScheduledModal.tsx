'use client';

import { Modal } from '@/core/components/Modal';
import { useRouter } from '@/core/i18n/navigation';
import { useModalStore } from '@/core/store/useModalStore';
import { sendingTypeLabel } from '@/modules/send-sms/scheduled-sms/constants/scheduled-sms';
import {
  IScheduledSms,
  SendingType,
} from '@/modules/send-sms/scheduled-sms/interfaces/scheduled-sms';
import {
  CalendarClock,
  FileText,
  Hash,
  Pencil,
  PencilLine,
  Users,
} from 'lucide-react';

const sendingTypeStyles: Record<SendingType, string> = {
  normal: 'bg-surface-raised text-secondary-content',
  flash: 'bg-amber-500/10 text-amber-500',
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

  const stats = [
    {
      icon: Users,
      label: 'Destinatários',
      value: scheduled.recipients.toLocaleString('pt-PT'),
    },
    {
      icon: Hash,
      label: 'SMS usados',
      value: scheduled.smsUsed.toLocaleString('pt-PT'),
    },
    {
      icon: CalendarClock,
      label: 'Data programada',
      value: formatDate(scheduled.sendingDate),
    },
    {
      icon: PencilLine,
      label: 'Última edição',
      value: formatDate(scheduled.editionDate),
    },
  ];

  return (
    <Modal id="DETAIL_SCHEDULED_SMS" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-ui bg-surface px-3 pb-4 shadow-sm">
        {/* Header */}
        <div className="mb-3 flex h-16 items-center justify-between border-b border-dashed border-border-ui pl-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center">
              <CalendarClock className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-medium text-primary-content">
                Detalhes do SMS Agendado
              </h2>
              <p className="truncate text-xs text-muted-content">
                Informações do agendamento e destinatários programados
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5">
            <div className="flex min-w-0 flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-content">
                Referência · Sender ID
              </span>
              <h3 className="truncate text-sm font-medium text-primary-content">
                <span className="font-mono">{scheduled.reference}</span>
                {' · '}
                {scheduled.sender || 'Padrão'}
              </h3>
            </div>

            <span
              className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-medium ${sendingTypeStyles[scheduled.sendingType]}`}
            >
              {sendingTypeLabel[scheduled.sendingType]}
            </span>
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
                Conteúdo do Disparo
              </span>
            </div>
            <div className="max-h-48 overflow-y-auto whitespace-pre-wrap break-words rounded-lg bg-surface-raised p-3 text-sm leading-relaxed text-secondary-content">
              {scheduled.content || 'Nenhum conteúdo definido.'}
            </div>
          </div>

          {/* Ações */}
          <div className="flex items-center justify-between border-t border-dashed border-border-ui pt-3">
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center m-auto gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Pencil size={16} />
              Editar Agendamento
            </button>
            <button
              type="button"
              onClick={handleClose}
              aria-label="Fechar"
              className="inline-flex items-center m-auto gap-2 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}

export default DetailScheduledModal;
