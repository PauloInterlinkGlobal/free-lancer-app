'use client';

import { Input } from '@/core/components/Input';
import { Select } from '@/core/components/Select';
import {
  IMPORT_FIELDS,
  MAX_CUSTOM_VARIABLES,
} from '@/modules/contacts/contacts-import/constants/import-steps';
import { IGroupOption } from '@/modules/contacts/contacts-import/interfaces/contacts-import';
import type { FilePreview } from '@/modules/contacts/contacts-import/utils/read-file-preview';
import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  FileSpreadsheet,
  FolderTree,
  Info,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { ImportStepHeader } from '../ImportStepHeader';

interface ReviewStepProps {
  fileName: string;
  preview: FilePreview;
  mapping: Record<string, string>;
  groups: IGroupOption[];
  group: string;
  onGroupChange: (group: string) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function ReviewStep({
  fileName,
  preview,
  mapping,
  groups,
  group,
  onGroupChange,
  tags,
  onTagsChange,
}: ReviewStepProps) {
  const [tagInput, setTagInput] = useState('');
  const [index, setIndex] = useState(0);

  const addTag = () => {
    const value = tagInput.trim();
    if (value && !tags.includes(value)) onTagsChange([...tags, value]);
    setTagInput('');
  };

  const mappedFields = IMPORT_FIELDS.filter((f) => mapping[f.id]);
  const customCount = mappedFields.filter((f) => !f.required).length;
  const sampleCount = preview.rows.length;
  const current = preview.rows[index] ?? [];

  const stats = [
    {
      value: preview.totalRows.toLocaleString(),
      label: 'Linhas a importar',
      className: 'bg-surface shadow-sm',
    },
    {
      value: `${mappedFields.length} / ${IMPORT_FIELDS.length}`,
      label: 'Campos mapeados',
      className: 'bg-primary/10',
    },
    {
      value: `${customCount} / ${MAX_CUSTOM_VARIABLES}`,
      label: 'Variáveis personalizadas',
      className: 'bg-surface-raised',
    },
  ];

  return (
    <div className="flex flex-col gap-4">
      <ImportStepHeader
        eyebrow="Passo 3 de 3 · Revisão"
        title="Pronto para processar"
        description="Todos os campos obrigatórios foram mapeados. Veja como ficam os seus contactos."
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        {/* Ficheiro */}
        <div className="flex flex-col justify-between gap-5 rounded-3xl bg-primary p-5 text-white md:p-6">
          <div className="flex items-center gap-4">
            <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/20">
              <FileSpreadsheet size={28} aria-hidden />
            </span>
            <div className="min-w-0">
              <p className="text-sm text-white/80">Ficheiro</p>
              <p className="truncate text-lg font-bold">{fileName}</p>
            </div>
          </div>

          <p className="flex items-center gap-2 text-sm text-white/90">
            <CheckCircle2 size={16} aria-hidden />
            {preview.totalRows.toLocaleString()} linhas detectadas
          </p>
        </div>

        {/* Pré-visualização do contacto */}
        <div className="flex flex-col gap-4 rounded-3xl bg-surface-raised p-5 md:p-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-content">
              Pré-visualização do contacto
            </span>
            <span className="text-sm font-bold text-muted-content">
              {sampleCount > 0 ? index + 1 : 0} / {sampleCount}
            </span>
          </div>

          <dl className="flex flex-col gap-3 rounded-2xl bg-surface p-4">
            {mappedFields.map((f) => (
              <div key={f.id} className="flex flex-col">
                <dt className="text-[11px] font-bold uppercase tracking-wider text-muted-content">
                  {f.label}
                </dt>
                <dd className="truncate text-base font-semibold text-primary-content">
                  {current[Number(mapping[f.id]) - 1] || '—'}
                </dd>
              </div>
            ))}
          </dl>

          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-content">
              Amostra de {sampleCount} de {preview.totalRows.toLocaleString()}{' '}
              linhas.
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                aria-label="Contacto anterior"
                disabled={index === 0}
                onClick={() => setIndex((i) => Math.max(0, i - 1))}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-surface text-primary-content transition-colors hover:bg-item-hover disabled:opacity-40"
              >
                <ChevronLeft size={18} aria-hidden />
              </button>
              <button
                type="button"
                aria-label="Contacto seguinte"
                disabled={index >= sampleCount - 1}
                onClick={() =>
                  setIndex((i) => Math.min(sampleCount - 1, i + 1))
                }
                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary text-white transition-opacity hover:opacity-90 disabled:opacity-40"
              >
                <ChevronRight size={18} aria-hidden />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mosaico */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className={`flex flex-col gap-1 rounded-3xl p-5 ${stat.className}`}
          >
            <span className="text-3xl font-bold leading-none text-primary-content">
              {stat.value}
            </span>
            <span className="mt-1 text-sm font-semibold text-primary-content">
              {stat.label}
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        {/* Organização */}
        <div className="flex flex-col gap-5 rounded-3xl bg-surface p-5 shadow-sm md:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FolderTree size={20} aria-hidden />
            </span>
            <h3 className="text-base font-bold text-primary-content">
              Organização da importação
            </h3>
          </div>

          <Select
            label="Adicionar ao grupo *"
            options={[{ value: '', label: 'Seleccione um grupo' }, ...groups]}
            value={group}
            onChange={(v) => onGroupChange(String(v))}
          />

          <div className="flex flex-col gap-2">
            <Input
              label="Aplicar etiquetas (tags)"
              placeholder="Escreva e carregue Enter"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag();
                }
              }}
            />

            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="flex items-center gap-1 rounded-full bg-primary/10 px-2.5 py-1 text-xs font-medium text-primary"
                  >
                    {tag}
                    <button
                      type="button"
                      aria-label={`Remover ${tag}`}
                      onClick={() =>
                        onTagsChange(tags.filter((t) => t !== tag))
                      }
                    >
                      <X size={12} aria-hidden />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Bom saber */}
        <div className="flex flex-col justify-center gap-2 rounded-3xl bg-surface-raised p-5 md:p-6">
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-muted-content">
            <Info size={14} aria-hidden />
            Bom saber
          </p>
          <p className="text-sm leading-relaxed text-primary-content">
            Os contactos são validados no servidor. Linhas inválidas ou
            duplicadas não serão importadas, e poderá descarregar um relatório
            dos erros após a conclusão.
          </p>
        </div>
      </div>
    </div>
  );
}
