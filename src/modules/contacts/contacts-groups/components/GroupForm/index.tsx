'use client';

import { Input } from '@/core/components/Input';
import type { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import { useState, type FormEvent } from 'react';
import { ContactsSelectTable } from './ContactsSelectTable';

export interface GroupFormValues {
  name: string;
  description: string;
  contactIds: string[];
}

interface GroupFormProps {
  mode: 'create' | 'update';
  initialValues?: GroupFormValues;
  contacts: IContact[];
  onSubmit?: (values: GroupFormValues) => void;
  onCancel: () => void;
}

const EMPTY: GroupFormValues = { name: '', description: '', contactIds: [] };

export function GroupForm({
  mode,
  initialValues = EMPTY,
  contacts,
  onSubmit,
  onCancel,
}: GroupFormProps) {
  const [values, setValues] = useState(initialValues);
  const [nameError, setNameError] = useState('');

  const isUpdate = mode === 'update';
  const isDirty = JSON.stringify(values) !== JSON.stringify(initialValues);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!values.name.trim()) {
      setNameError('Obrigatório');
      return;
    }
    onSubmit?.({ ...values, name: values.name.trim() });
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <div className="flex max-h-[65vh] flex-col gap-5 overflow-y-auto px-6 py-5">
        <Input
          id="group-name"
          label="Nome do Grupo *"
          value={values.name}
          onChange={(e) => {
            setValues((v) => ({ ...v, name: e.target.value }));
            setNameError('');
          }}
          error={nameError}
        />

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="group-description"
            className="text-sm font-medium text-primary-content"
          >
            Descrição{' '}
            <span className="font-normal text-muted-content">(Opcional)</span>
          </label>
          <textarea
            id="group-description"
            rows={3}
            value={values.description}
            onChange={(e) =>
              setValues((v) => ({ ...v, description: e.target.value }))
            }
            className="w-full resize-none rounded-lg border border-border-ui bg-surface px-3 py-2 text-sm text-primary-content outline-none transition-colors placeholder:text-muted-content focus:border-primary"
          />
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-sm font-medium text-primary-content">
            Contactos do grupo
          </span>
          <ContactsSelectTable
            contacts={contacts}
            selected={values.contactIds}
            onChange={(contactIds) => setValues((v) => ({ ...v, contactIds }))}
          />
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t border-divider px-6 py-4">
        <span className="text-sm text-muted-content">
          {values.contactIds.length} selecionado
          {values.contactIds.length === 1 ? '' : 's'}
        </span>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="inline-flex h-10 items-center rounded-lg border border-border-ui bg-surface px-4 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isUpdate && !isDirty}
            className="inline-flex h-10 items-center rounded-lg bg-primary px-4 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
          >
            {isUpdate ? 'Atualizar' : 'Criar'}
          </button>
        </div>
      </div>
    </form>
  );
}

export default GroupForm;
