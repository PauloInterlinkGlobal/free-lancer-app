'use client';

import { Input } from '@/core/components/Input';
import { Building2 } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import type { CompanyInfo } from '../interfaces';
import { COMPANY_MOCK } from '../mocks/company.mock';

type Errors = Partial<Record<keyof CompanyInfo, string>>;

function validate(v: CompanyInfo): Errors {
  const errors: Errors = {};
  if (!v.name.trim()) errors.name = 'Obrigatório';
  return errors;
}

export function CompanyForm({
  defaultValues = COMPANY_MOCK,
}: {
  defaultValues?: CompanyInfo;
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
          <Building2 size={24} aria-hidden />
        </span>

        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
            Dados da empresa
          </h2>
          <p className="mt-1 text-sm text-muted-content">
            Atualize as informações da sua empresa.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <Input
          id="name"
          name="name"
          label="Nome da empresa *"
          value={values.name}
          placeholder="Insira o novo nome da Empresa"
          onChange={handleChange}
          error={errors.name}
        />

        <Input
          id="taxId"
          name="taxId"
          type="text"
          label="NIF"
          value={values.taxId}
          placeholder="Insira o novo Número de Identificação Fiscal da Empresa"
          onChange={handleChange}
        />

        <Input
          id="local"
          name="local"
          label="Endereço da Empresa"
          type="text"
          value={values.local}
          placeholder="Insira a nova localização atual da Empresa"
          onChange={handleChange}
        />

        <Input
          id="sector"
          name="sector"
          type="text"
          label="Sector de actividade"
          placeholder="Insira o novo sector de atividade da Empresa"
          value={values.sector}
          onChange={handleChange}
        />

        <Input
          id="email"
          name="email"
          type="email"
          label="Email da Empresa"
          placeholder="Insira o novo email da Empresa aqui"
          value={values.email}
          onChange={handleChange}
        />

        <Input
          id="phone"
          name="phone"
          type="tel"
          label="Telefone"
          value={values.phone}
          placeholder="Insira o novo número da Empresa"
          onChange={handleChange}
        />

        <Input
          id="site"
          name="site"
          type="text"
          label="Insira o novo Website da Empresa"
          value={values.site}
          placeholder="Insira o novo número da Empresa"
          onChange={handleChange}
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
