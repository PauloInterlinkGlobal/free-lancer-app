'use client';

import { Input } from '@/core/components/Input';
import { Select } from '@/core/components/Select';
import { IGroupOption } from '@/modules/contacts/contacts-import/interfaces/contacts-import';
import {
  CheckCircle2,
  FileSpreadsheet,
  FolderTree,
  Info,
  Rocket,
  Rows3,
  X,
} from 'lucide-react';
import { useState } from 'react';

interface ReviewStepProps {
  fileName: string;
  totalRows: number;
  groups: IGroupOption[];
  group: string;
  onGroupChange: (group: string) => void;
  tags: string[];
  onTagsChange: (tags: string[]) => void;
}

export function ReviewStep({
  fileName,
  totalRows,
  groups,
  group,
  onGroupChange,
  tags,
  onTagsChange,
}: ReviewStepProps) {
  const [tagInput, setTagInput] = useState('');

  const addTag = () => {
    const value = tagInput.trim();
    if (value && !tags.includes(value)) onTagsChange([...tags, value]);
    setTagInput('');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Card: estado */}
      <div className="flex items-center gap-4 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-green-500/10 text-green-500">
          <CheckCircle2 size={24} aria-hidden />
        </span>

        <div className="min-w-0">
          <h2 className="text-lg font-bold leading-tight text-primary-content md:text-xl">
            Pronto para processar
          </h2>
          <p className="mt-1 text-sm text-muted-content">
            Todos os campos obrigatórios foram mapeados.
          </p>
        </div>
      </div>

      {/* Cards: ficheiro e linhas */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl bg-surface p-5 shadow-sm">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <FileSpreadsheet size={24} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-muted-content">Ficheiro</p>
            <p className="mt-1 truncate text-base font-semibold text-primary-content">
              {fileName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl bg-surface p-5 shadow-sm">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <Rows3 size={24} aria-hidden />
          </span>
          <div className="min-w-0">
            <p className="text-sm text-muted-content">Linhas detectadas</p>
            <p className="mt-1 text-2xl font-bold text-primary-content">
              {totalRows.toLocaleString()}
            </p>
          </div>
        </div>
      </div>

      {/* Cards: organização + pronto */}
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1.6fr_1fr]">
        <div className="flex flex-col gap-5 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
          <div className="flex items-center gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <FolderTree size={20} aria-hidden />
            </span>
            <h3 className="text-base font-semibold text-primary-content">
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

        <div className="flex flex-col justify-between gap-5 rounded-2xl bg-surface p-5 shadow-sm md:p-6">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Rocket size={20} aria-hidden />
              </span>
              <h3 className="text-base font-semibold text-primary-content">
                Pronto para começar?
              </h3>
            </div>

            <div className="rounded-xl bg-surface-raised p-4">
              <p className="text-3xl font-bold text-primary-content">
                {totalRows.toLocaleString()}
              </p>
              <p className="text-sm text-muted-content">
                linhas serão enviadas para importação.
              </p>
            </div>
          </div>

          <p className="flex items-start gap-2 text-xs text-muted-content">
            <Info size={14} aria-hidden className="mt-0.5 shrink-0" />
            Os contactos são validados no servidor. Linhas inválidas ou
            duplicadas não serão importadas, e poderá descarregar um relatório
            dos erros após a conclusão.
          </p>
        </div>
      </div>
    </div>
  );
}
