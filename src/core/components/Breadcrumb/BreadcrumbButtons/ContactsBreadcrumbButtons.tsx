'use client';

import { Download, Plus, Upload } from 'lucide-react';

interface ContactsBreadcrumbButtonsProps {
  onImport: () => void;
  onExport: () => void;
  onAdd: () => void;
}

const secondaryButton =
  'flex items-center gap-2 rounded-lg border border-ui bg-surface px-4 py-2 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover';

export function ContactsBreadcrumbButtons({
  onImport,
  onExport,
  onAdd,
}: ContactsBreadcrumbButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button type="button" onClick={onImport} className={secondaryButton}>
        <Upload size={16} aria-hidden />
        Importar
      </button>

      <button type="button" onClick={onExport} className={secondaryButton}>
        <Download size={16} aria-hidden />
        Exportar
      </button>

      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <Plus size={16} aria-hidden />
        Adicionar contacto
      </button>
    </div>
  );
}
