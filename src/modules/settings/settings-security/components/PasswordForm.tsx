'use client';

import { Input } from '@/core/components/Input';
import { KeyRound } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { PasswordFormValues } from '../interfaces';

type Errors = Partial<Record<keyof PasswordFormValues, string>>;

const EMPTY: PasswordFormValues = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

function validate(v: PasswordFormValues): Errors {
  const errors: Errors = {};

  if (!v.currentPassword) errors.currentPassword = 'Obrigatório';

  if (!v.newPassword) errors.newPassword = 'Obrigatório';
  else if (v.newPassword.length < 8)
    errors.newPassword = 'Mínimo de 8 caracteres';

  if (!v.confirmPassword) errors.confirmPassword = 'Obrigatório';
  else if (v.confirmPassword !== v.newPassword)
    errors.confirmPassword = 'As palavras-passe não coincidem';

  return errors;
}

export function PasswordForm() {
  const [values, setValues] = useState<PasswordFormValues>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});

  const isDirty = Object.values(values).some(Boolean);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: undefined }));
  };

  const handleCancel = () => {
    setValues(EMPTY);
    setErrors({});
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const found = validate(values);
    setErrors(found);

    if (Object.keys(found).length > 0) return;

    setValues(EMPTY);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="flex flex-col gap-6 rounded-2xl bg-surface p-5 shadow-sm md:p-6"
    >
      <div className="flex items-start gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center text-primary">
          <KeyRound size={24} aria-hidden />
        </span>

        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
            Palavra-passe
          </h2>

          <p className="mt-1 text-sm text-muted-content">
            Altere a sua palavra-passe de acesso.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="currentPassword"
          name="currentPassword"
          label="Palavra-passe atual *"
          showPasswordToggle
          autoComplete="current-password"
          value={values.currentPassword}
          onChange={handleChange}
          error={errors.currentPassword}
        />

        <Input
          id="newPassword"
          name="newPassword"
          label="Nova palavra-passe *"
          showPasswordToggle
          autoComplete="new-password"
          value={values.newPassword}
          onChange={handleChange}
          error={errors.newPassword}
        />

        <Input
          id="confirmPassword"
          name="confirmPassword"
          label="Confirmar palavra-passe *"
          showPasswordToggle
          autoComplete="new-password"
          value={values.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
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
