'use client';

import { Input } from '@/core/components/Input';
import { Select } from '@/core/components/Select';
import { UserRound } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { PersonalInfo } from '../interfaces';

type Errors = Partial<Record<keyof PersonalInfo, string>>;

const ROLE_OPTIONS = [
  { value: 'admin', label: 'Administrador' },
  { value: 'manager', label: 'Gestor' },
  { value: 'staff', label: 'Colaborador' },
];

function validate(v: PersonalInfo): Errors {
  const errors: Errors = {};
  if (!v.firstName.trim()) errors.firstName = 'Obrigatório';
  if (!v.lastName.trim()) errors.lastName = 'Obrigatório';
  if (!v.email.trim()) errors.email = 'Obrigatório';
  else if (!/^\S+@\S+\.\S+$/.test(v.email)) errors.email = 'Email inválido';
  return errors;
}

export function PersonalForm({
  defaultValues,
}: {
  defaultValues: PersonalInfo;
}) {
  const [initial, setInitial] = useState(defaultValues);
  const [values, setValues] = useState(defaultValues);
  const [errors, setErrors] = useState<Errors>({});

  const isDirty = JSON.stringify(values) !== JSON.stringify(initial);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCancel = () => {
    setValues(initial);
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate(values);
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    console.log(values);
    setInitial(values);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center text-primary">
          <UserRound size={24} aria-hidden />
        </span>

        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
            Informação pessoal
          </h2>
          <p className="mt-1 text-sm text-muted-content">
            Atualize os seus dados pessoais.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="firstName"
          name="firstName"
          label="Nome *"
          value={values.firstName}
          onChange={handleChange}
          error={errors.firstName}
        />

        <Input
          id="lastName"
          name="lastName"
          label="Apelido *"
          value={values.lastName}
          onChange={handleChange}
          error={errors.lastName}
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email *"
          value={values.email}
          onChange={handleChange}
          error={errors.email}
        />

        <Select
          label="Função"
          options={ROLE_OPTIONS}
          value={values.role}
          onChange={(v) => setValues((prev) => ({ ...prev, role: String(v) }))}
        />
      </div>

      <div className="flex justify-end gap-2 border-t border-black/5 pt-4">
        <button
          type="button"
          onClick={handleCancel}
          disabled={!isDirty}
          className="rounded-xl px-5 py-2.5 text-sm font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content disabled:cursor-not-allowed disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          disabled={!isDirty}
          className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
        >
          Guardar alterações
        </button>
      </div>
    </form>
  );
}
