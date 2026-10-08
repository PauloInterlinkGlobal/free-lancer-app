'use client';

import { Download } from 'lucide-react';

interface HistoryBreadcrumbButtonsProps {
  onExport: () => void;
  onClear?: () => void;
}

export function HistoryBreadcrumbButtons({
  onExport,
}: HistoryBreadcrumbButtonsProps) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={onExport}
        className="flex items-center gap-2 rounded-lg border border-ui bg-surface px-4 py-2 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
      >
        <Download size={16} aria-hidden />
        Exportar histórico
      </button>
    </div>
  );
}
