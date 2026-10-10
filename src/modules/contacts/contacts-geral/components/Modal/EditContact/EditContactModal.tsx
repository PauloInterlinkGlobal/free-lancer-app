'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { MultiSelect } from '@/core/components/Select';
import Select from '@/core/components/Select';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import {
  sexLabel,
  statusLabel,
} from '@/modules/contacts/contacts-geral/constants/contacts';
import {
  ContactSex,
  ContactStatus,
  IContact,
} from '@/modules/contacts/contacts-geral/interfaces/contacts';
import { groupsMock } from '@/modules/contacts/contacts-groups/mocks/groups.mock';
import { Pencil, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const sexOptions = Object.entries(sexLabel).map(([value, label]) => ({
  value,
  label,
}));

const statusOptions = Object.entries(statusLabel).map(([value, label]) => ({
  value,
  label,
}));

const groupOptions = groupsMock.map((group) => ({
  value: group.name,
  label: group.name,
}));

interface EditContactModalProps {
  contact?: IContact | null;
  onClose?: () => void;
  onUpdated?: (contact: IContact) => void;
}

export function EditContactModal({
  contact,
  onClose,
  onUpdated,
}: EditContactModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [sex, setSex] = useState<ContactSex>('male');
  const [status, setStatus] = useState<ContactStatus>('active');
  const [groups, setGroups] = useState<string[]>([]);
  const [errors, setErrors] = useState<{ name?: string; number?: string }>({});

  useEffect(() => {
    if (!contact) return;
    setName(contact.name);
    setNumber(contact.number);
    setSex(contact.sex);
    setStatus(contact.status);
    setGroups(contact.groups);
    setErrors({});
  }, [contact]);

  const handleClose = () => {
    closeModal();
    onClose?.();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!contact) return;

    const trimmedName = name.trim();
    const trimmedNumber = number.trim();
    const nextErrors: typeof errors = {};

    if (!trimmedName) nextErrors.name = 'O nome é obrigatório.';
    if (!trimmedNumber) {
      nextErrors.number = 'O número é obrigatório.';
    } else if (trimmedNumber.replace(/\D/g, '').length < 9) {
      nextErrors.number = 'Introduza um número de telefone válido.';
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    success(`Contacto "${trimmedName}" actualizado com sucesso!`);
    onUpdated?.({
      ...contact,
      name: trimmedName,
      number: trimmedNumber,
      sex,
      status,
      groups,
    });
    handleClose();
  };

  if (!contact) return null;

  return (
    <Modal id="EDIT_CONTACT" onClose={handleClose}>
      <div className="w-full max-w-lg rounded-xl border border-border-ui bg-surface shadow-2xl">
        <div className="flex items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center text-primary">
              <Pencil className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-medium text-primary-content">
                Editar Contacto
              </h2>
              <p className="text-xs text-muted-content">
                Actualize os dados do contacto.
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

        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-5">
          <Input
            label="Nome do contacto"
            placeholder="Ex: Ana Ferreira"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
            }}
            error={errors.name}
            autoFocus
          />

          <Input
            label="Número"
            placeholder="+244 900 000 000"
            value={number}
            onChange={(e) => {
              setNumber(e.target.value);
              if (errors.number) setErrors((prev) => ({ ...prev, number: '' }));
            }}
            error={errors.number}
          />

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Select
              label="Sexo"
              value={sex}
              options={sexOptions}
              onValueChange={(value) => setSex(value as ContactSex)}
            />
            <Select
              label="Estado"
              value={status}
              options={statusOptions}
              onValueChange={(value) => setStatus(value as ContactStatus)}
            />
          </div>

          <MultiSelect
            label="Grupos"
            placeholder="Seleccione os grupos"
            value={groups}
            options={groupOptions}
            onChange={(value) => setGroups(value.map(String))}
          />

          <div className="mt-2 flex items-center justify-end gap-2 border-t border-dashed border-border-ui pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="rounded-lg border border-border-ui bg-surface-raised px-4 py-2 text-sm text-secondary-content transition-colors hover:bg-item-hover hover:text-primary-content"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Guardar alterações
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
