'use client';

import { Select, type SelectOption } from '@/core/components/Select';
import { Table, type Column } from '@/core/components/Table';
import {
  IMPORT_FIELDS,
  MAX_CUSTOM_VARIABLES,
} from '@/modules/contacts/contacts-import/constants/import-steps';
import type { FilePreview } from '@/modules/contacts/contacts-import/utils/read-file-preview';
import { AlertTriangle, ClipboardList, Columns3 } from 'lucide-react';

interface MappingStepProps {
  preview: FilePreview | null;
  loading: boolean;
  error: string;
  mapping: Record<string, string>;
  onChange: (fieldId: string, column: string) => void;
}

type PreviewRow = Record<string, string>;

export function MappingStep({
  preview,
  loading,
  error,
  mapping,
  onChange,
}: MappingStepProps) {
  const requiredMapped = IMPORT_FIELDS.filter((f) => f.required).every(
    (f) => mapping[f.id]
  );

  const customCount = IMPORT_FIELDS.filter(
    (f) => !f.required && mapping[f.id]
  ).length;

  const mappedCount = IMPORT_FIELDS.filter((f) => mapping[f.id]).length;

  const summary = [
    { label: 'Linhas no ficheiro', value: preview?.totalRows ?? '—' },
    { label: 'Colunas detectadas', value: preview?.headers.length ?? '—' },
    { label: 'Campos mapeados', value: mappedCount },
  ];

  const data: PreviewRow[] = (preview?.rows ?? []).map((row) =>
    Object.fromEntries(row.map((cell, i) => [String(i + 1), cell]))
  );

  const fieldOfColumn = (column: string) =>
    IMPORT_FIELDS.find((f) => mapping[f.id] === column)?.id ?? '';

  const handleColumnChange = (column: string, fieldId: string) => {
    const previous = fieldOfColumn(column);
    if (previous && previous !== fieldId) onChange(previous, '');
    if (fieldId) onChange(fieldId, column);
    else if (previous) onChange(previous, '');
  };

  const columns: Column<PreviewRow>[] = (preview?.headers ?? []).map(
    (name, index) => {
      const column = String(index + 1);

      const options: SelectOption[] = [
        { value: '', label: 'Não mapear' },
        ...IMPORT_FIELDS.map((f) => ({
          value: f.id,
          label: f.required ? `${f.label} *` : f.label,
          disabled: Boolean(mapping[f.id]) && mapping[f.id] !== column,
        })),
      ];

      return {
        key: column,
        headerClassName: 'min-w-48 align-top',
        header: (
          <div className="flex flex-col gap-2">
            <span className="truncate text-xs font-medium text-muted-content">
              {name}
            </span>
            <Select
              options={options}
              value={fieldOfColumn(column)}
              onChange={(v) => handleColumnChange(column, String(v))}
            />
          </div>
        ),
      };
    }
  );

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
      {/* Card esquerdo: pré-visualização + mapeamento */}
      <div className="flex min-w-0 flex-col gap-5 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <div className="flex items-start gap-4">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Columns3 size={24} aria-hidden />
          </span>

          <div className="min-w-0">
            <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
              Mapeie as colunas
            </h2>
            <p className="mt-1 text-sm text-muted-content">
              Escolha, em cada coluna do ficheiro, o campo correspondente. Os
              campos <strong className="text-primary-content">Nome</strong> e{' '}
              <strong className="text-primary-content">Telemóvel</strong> são
              obrigatórios.
            </p>
          </div>
        </div>

        {error ? (
          <p role="alert" className="text-sm text-red-500">
            {error}
          </p>
        ) : (
          <>
            <Table<PreviewRow>
              columns={columns}
              data={data}
              loading={loading}
              className="min-h-72"
              keyExtractor={(_, index) => index}
              emptyMessage="O ficheiro não tem linhas para pré-visualizar."
            />

            {preview && (
              <p className="text-xs text-muted-content">
                A mostrar {data.length} de {preview.totalRows} linhas.
              </p>
            )}
          </>
        )}
      </div>

      {/* Card direito: resumo */}
      <div className="flex flex-col gap-5 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <div className="flex items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <ClipboardList size={20} aria-hidden />
          </span>
          <h3 className="text-base font-semibold text-primary-content">
            Resumo da importação
          </h3>
        </div>

        <dl className="flex flex-col divide-y divide-black/5">
          {summary.map(({ label, value }) => (
            <div
              key={label}
              className="flex items-center justify-between py-3 text-sm"
            >
              <dt className="text-muted-content">{label}</dt>
              <dd className="font-semibold text-primary-content">{value}</dd>
            </div>
          ))}
        </dl>

        <div className="rounded-xl bg-surface-raised p-4">
          <p className="text-xs text-muted-content">Variáveis personalizadas</p>
          <p className="mt-1 text-2xl font-bold text-primary-content">
            {customCount} / {MAX_CUSTOM_VARIABLES}
          </p>
        </div>

        {!requiredMapped && (
          <p className="flex items-start gap-2 text-xs text-amber-500">
            <AlertTriangle size={14} aria-hidden className="mt-0.5 shrink-0" />
            Mapeie Nome e Telemóvel para continuar.
          </p>
        )}
      </div>
    </div>
  );
}
