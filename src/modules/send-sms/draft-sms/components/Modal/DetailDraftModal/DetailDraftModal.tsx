'use client';

import { Modal } from '@/core/components/Modal';
import { useRouter } from '@/core/i18n/navigation';
import { useModalStore } from '@/core/store/useModalStore';
import { sendingTypeLabel } from '@/modules/send-sms/draft-sms/constants/draft-sms';
import {
  DraftSendingType,
  DraftSmsType,
  IDraftSms,
} from '@/modules/send-sms/draft-sms/interfaces/draft-sms';
import { FileText, Hash, Pencil, PencilLine, Users } from 'lucide-react';

const smsTypeStyles: Record<DraftSmsType, string> = {
  immediate: 'text-primary',
  scheduled: 'text-secondary',
};

const sendingTypeStyles: Record<DraftSendingType, string> = {
  flash: 'bg-amber-500/10 text-amber-500',
  normal: 'bg-surface-raised text-secondary-content',
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

interface DetailDraftModalProps {
  draft?: IDraftSms | null;
  onClose?: () => void;
}

export function DetailDraftModal({ draft, onClose }: DetailDraftModalProps) {
  const { closeModal } = useModalStore();
  const router = useRouter();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleEdit = () => {
    if (!draft) return;
    handleClose();
    router.push(`/send-sms?draft=${draft.id}`);
  };

  if (!draft) return null;

  const stats = [
    {
      icon: Users,
      label: 'Destinatários',
      value: (draft.recipients ?? 0).toLocaleString('pt-PT'),
    },
    {
      icon: Hash,
      label: 'SMS usados',
      value: (draft.smsUsed ?? 0).toLocaleString('pt-PT'),
    },
    {
      icon: PencilLine,
      label: 'Última edição',
      value: formatDate(draft.editionDate),
    },
  ];

  return (
    <Modal id="DETAIL_DRAFT_SMS" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-ui bg-surface px-3 pb-4 shadow-sm">
        {/* Header */}
        <div className="mb-3 flex h-16 items-center justify-between border-b border-dashed border-border-ui pl-1">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="min-w-0">
              <h2 className="truncate text-sm font-medium text-primary-content">
                Detalhes do Rascunho
              </h2>
              <p className="truncate text-xs text-muted-content">
                Informações e conteúdo da mensagem em rascunho
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between gap-3 rounded-xl px-3 py-2.5">
            <div className="flex min-w-0 flex-col">
              <span className="text-[10px] font-semibold uppercase tracking-wider text-muted-content">
                Sender ID
              </span>
              <h3 className="truncate text-sm font-medium text-primary-content">
                {draft.sender || 'Padrão / Não definido'}
              </h3>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <span
                className={`rounded-full px-2.5 py-1 text-xs font-medium ${sendingTypeStyles[draft.sendingType]}`}
              >
                {sendingTypeLabel[draft.sendingType]}
              </span>
            </div>
          </div>

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
              {draft.content || 'Nenhum conteúdo definido.'}
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-dashed border-border-ui pt-3">
            <button
              type="button"
              onClick={handleEdit}
              className="inline-flex items-center gap-2 rounded-lg m-auto bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              <Pencil size={16} />
              Continuar a Editar
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

export default DetailDraftModal;
