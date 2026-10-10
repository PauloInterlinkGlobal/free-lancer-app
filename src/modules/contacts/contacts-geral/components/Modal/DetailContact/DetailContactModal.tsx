'use client';

import { Modal } from '@/core/components/Modal';
import { useModalStore } from '@/core/store/useModalStore';
import {
  sexLabel,
  statusLabel,
} from '@/modules/contacts/contacts-geral/constants/contacts';
import {
  ContactStatus,
  IContact,
} from '@/modules/contacts/contacts-geral/interfaces/contacts';
import {
  Calendar,
  Phone,
  Pencil,
  User,
  UserRound,
  Users,
  X,
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

const statusStyles: Record<ContactStatus, string> = {
  active: 'text-emerald-600 dark:text-emerald-400',
  inactive: 'text-muted-content',
  blocked: 'text-rose-600 dark:text-rose-400',
};

interface DetailContactModalProps {
  contact?: IContact | null;
  onClose?: () => void;
  onEdit?: (contact: IContact) => void;
}

export function DetailContactModal({
  contact,
  onClose,
  onEdit,
}: DetailContactModalProps) {
  const { closeModal } = useModalStore();

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  if (!contact) return null;

  const rows = [
    { icon: Phone, label: 'Número', value: contact.number },
    { icon: User, label: 'Sexo', value: contact.sex ? sexLabel[contact.sex] : '—' },
    {
      icon: Calendar,
      label: 'Data de criação',
      value: formatDate(contact.date),
    },
  ];

  return (
    <Modal id="DETAIL_CONTACT" onClose={handleClose}>
      <div className="w-full max-w-md overflow-hidden rounded-xl border border-border-ui bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-primary">
              <UserRound className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-primary-content">
                Detalhes do Contacto
              </h2>
              <p className="text-xs text-muted-content">
                Informações do contacto registado
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-5">
          <div className="flex flex-col items-center gap-2 px-4 py-4 text-center">
            <h3 className="max-w-full truncate text-lg font-semibold text-primary-content">
              {contact.name}
            </h3>
            <span
              className={`text-xs font-medium ${statusStyles[contact.status]}`}
            >
              {statusLabel[contact.status]}
            </span>
          </div>

          <dl className="flex flex-col rounded-xl border border-border-ui">
            {rows.map(({ icon: Icon, label, value }, i) => (
              <div
                key={label}
                className={`flex items-center justify-between gap-3 px-3.5 py-3 ${
                  i > 0 ? 'border-t border-dashed border-border-ui' : ''
                }`}
              >
                <dt className="flex items-center gap-2.5 text-xs text-muted-content">
                  <span className="flex h-7 w-7 items-center justify-center text-primary">
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

          <div className="flex flex-col gap-2 rounded-xl border border-border-ui p-3.5">
            <div className="flex items-center gap-2 text-muted-content">
              <Users className="h-4 w-4" />
              <span className="text-[10px] font-semibold uppercase tracking-wider">
                Grupos
              </span>
            </div>
            {contact.groups.length > 0 ? (
              <div className="flex flex-wrap gap-1.5">
                {contact.groups.map((group) => (
                  <span
                    key={group}
                    className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {group}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm italic text-muted-content">
                Este contacto não pertence a nenhum grupo.
              </p>
            )}
          </div>

          <div className="flex items-center justify-end gap-2 border-t border-dashed border-border-ui pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-border-ui bg-surface-raised px-4 py-2 text-sm text-secondary-content transition-colors hover:bg-item-hover hover:text-primary-content"
            >
              Fechar
            </button>
            {onEdit && (
              <button
                type="button"
                onClick={() => onEdit(contact)}
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                <Pencil className="h-4 w-4" />
                Editar
              </button>
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}
