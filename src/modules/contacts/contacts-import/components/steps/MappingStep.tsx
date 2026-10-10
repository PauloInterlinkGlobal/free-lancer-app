'use client';

import { Select, type SelectOption } from '@/core/components/Select';
import {
  IMPORT_FIELDS,
  MAX_CUSTOM_VARIABLES,
} from '@/modules/contacts/contacts-import/constants/import-steps';
import type { FilePreview } from '@/modules/contacts/contacts-import/utils/read-file-preview';
import { AlertTriangle, Check } from 'lucide-react';
import { ImportStepHeader } from '../ImportStepHeader';

interface MappingStepProps {
  preview: FilePreview | null;
  loading: boolean;
  error: string;
  mapping: Record<string, string>;
  onChange: (fieldId: string, column: string) => void;
}

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

  const mappedFields = IMPORT_FIELDS.filter((f) => mapping[f.id]);
  const firstRow = preview?.rows[0] ?? [];

  const fieldOfColumn = (column: string) =>
    IMPORT_FIELDS.find((f) => mapping[f.id] === column)?.id ?? '';

  const handleColumnChange = (column: string, fieldId: string) => {
    const previous = fieldOfColumn(column);
    if (previous && previous !== fieldId) onChange(previous, '');
    if (fieldId) onChange(fieldId, column);
    else if (previous) onChange(previous, '');
  };

  const stats = [
    { label: 'linhas', value: preview?.totalRows ?? '—' },
    { label: 'colunas', value: preview?.headers.length ?? '—' },
    { label: 'mapeadas', value: mappedFields.length },
  ];

  return (
    <div className="flex flex-col gap-4">
      <ImportStepHeader
        eyebrow="Passo 2 de 3 · Mapeamento"
        title="Ligue cada coluna ao seu campo"
        description="Escolha, para cada coluna do ficheiro, o campo correspondente. Nome e Telemóvel são obrigatórios."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Colunas -> campos */}
        <div className="flex min-w-0 flex-col gap-3 rounded-3xl bg-surface p-5 shadow-sm md:p-6">
          <div className="flex justify-between px-1 text-[11px] font-bold uppercase tracking-widest text-muted-content">
            <span>Colunas do ficheiro</span>
            <span className="hidden sm:block">Campo de destino</span>
          </div>

          {error ? (
            <p role="alert" className="text-sm text-red-500">
              {error}
            </p>
          ) : loading || !preview ? (
            <p className="py-10 text-center text-sm text-muted-content">
              A ler o ficheiro…
            </p>
          ) : (
            <>
              {preview.headers.map((name, index) => {
                const column = String(index + 1);
                const fieldId = fieldOfColumn(column);
                const mapped = Boolean(fieldId);

                const options: SelectOption[] = [
                  { value: '', label: 'Não mapear' },
                  ...IMPORT_FIELDS.map((f) => ({
                    value: f.id,
                    label: f.required ? `${f.label} *` : f.label,
                    disabled:
                      Boolean(mapping[f.id]) && mapping[f.id] !== column,
                  })),
                ];

                return (
                  <div
                    key={column}
                    className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3"
                  >
                    <div className="flex min-w-0 flex-1 flex-col rounded-2xl bg-surface-raised px-4 py-3">
                      <span className="truncate text-[11px] font-bold uppercase tracking-wider text-muted-content">
                        {name}
                      </span>
                      <span className="truncate text-sm font-semibold text-primary-content">
                        {firstRow[index] || '—'}
                      </span>
                    </div>

                    <span
                      aria-hidden
                      className={`hidden w-8 shrink-0 border-t-2 sm:block ${
                        mapped ? 'border-primary' : 'border-dashed border-ui'
                      }`}
                    />

                    <div
                      className={`flex min-w-0 flex-1 items-center gap-2 rounded-2xl border-2 p-2 ${
                        mapped
                          ? 'border-primary bg-primary/10'
                          : 'border-dashed border-ui'
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <Select
                          options={options}
                          value={fieldId}
                          onChange={(v) =>
                            handleColumnChange(column, String(v))
                          }
                        />
                      </div>
                      {mapped && (
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-white">
                          <Check size={14} aria-hidden />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}

              <p className="px-1 text-xs text-muted-content">
                A mostrar a primeira linha de {preview.totalRows} no ficheiro.
              </p>
            </>
          )}
        </div>

        {/* Resultado + variáveis */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-3 rounded-3xl bg-primary p-5 text-white md:p-6">
            <span className="text-xs font-bold uppercase tracking-widest text-white/80">
              Resultado do primeiro contacto
            </span>

            {mappedFields.length > 0 ? (
              <dl className="flex flex-col gap-3 rounded-2xl bg-white/15 p-4">
                {mappedFields.map((f) => (
                  <div key={f.id} className="flex flex-col">
                    <dt className="text-[11px] font-bold uppercase tracking-wider text-white/75">
                      {f.label}
                    </dt>
                    <dd className="truncate text-base font-bold">
                      {firstRow[Number(mapping[f.id]) - 1] || '—'}
                    </dd>
                  </div>
                ))}
              </dl>
            ) : (
              <p className="rounded-2xl bg-white/15 p-4 text-sm text-white/90">
                Associe colunas aos campos para ver o resultado.
              </p>
            )}
          </div>

          <div className="flex flex-col gap-4 rounded-3xl bg-surface p-5 shadow-sm md:p-6">
            <div className="flex items-baseline justify-between">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-content">
                Variáveis personalizadas
              </span>
              <span className="text-xl font-bold text-primary-content">
                {customCount} / {MAX_CUSTOM_VARIABLES}
              </span>
            </div>

            <div className="flex gap-1.5" aria-hidden>
              {Array.from({ length: MAX_CUSTOM_VARIABLES }).map((_, i) => (
                <span
                  key={i}
                  className={`h-2.5 flex-1 rounded-full ${
                    i < customCount ? 'bg-primary' : 'bg-surface-raised'
                  }`}
                />
              ))}
            </div>

            <p className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-muted-content">
              {stats.map((s) => (
                <span key={s.label}>
                  <b className="text-primary-content">{s.value}</b> {s.label}
                </span>
              ))}
            </p>

            {!requiredMapped && (
              <p className="flex items-start gap-2 text-xs text-amber-500">
                <AlertTriangle
                  size={14}
                  aria-hidden
                  className="mt-0.5 shrink-0"
                />
                Mapeie Nome e Telemóvel para continuar.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
