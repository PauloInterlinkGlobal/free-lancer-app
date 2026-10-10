'use client';

import { FileText, X } from 'lucide-react';
import type { ISmsTemplate } from '../../../interfaces';
import { PickerTrigger } from '../../PickerTrigger';

interface TemplatesCardProps {
  templates: ISmsTemplate[];
  selectedId: string | null;
  onSelect: (template: ISmsTemplate | null) => void;
}

export function TemplatesCard({
  templates,
  selectedId,
  onSelect,
}: TemplatesCardProps) {
  const selected = templates.find((t) => t.id === selectedId) ?? null;

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-primary-content">
          Começar a partir de um modelo
        </span>

        <PickerTrigger id="PICK_TEMPLATES" label="Ver todos" />
      </div>

      {!selected ? (
        <div className="flex flex-col items-center justify-center gap-1 rounded-xl border border-dashed border-border-ui bg-surface/50 px-4 py-5 text-center">
          <p className="text-sm text-muted-content">Nenhum modelo seleccionado.</p>
          <p className="text-xs text-muted-content">
            Clique em «Ver todos» para escolher um modelo.
          </p>
        </div>
      ) : (
        <div className="flex items-start gap-3 rounded-xl border border-primary bg-primary/10 p-3 shadow-sm">
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary text-white">
            <FileText size={16} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <span className="block truncate text-sm font-semibold text-primary-content">
              {selected.title}
            </span>
            <span className="mt-0.5 line-clamp-2 text-xs text-muted-content">
              {selected.content}
            </span>
          </div>
          <button
            type="button"
            onClick={() => onSelect(null)}
            aria-label="Remover modelo"
            className="rounded-lg p-1 text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={16} aria-hidden />
          </button>
        </div>
      )}
    </div>
  );
}

export default TemplatesCard;
