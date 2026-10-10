'use client';

import { Download } from 'lucide-react';

interface ReportsBreadcrumbButtonsProps {
  onExport?: () => void;
}

export function ReportsBreadcrumbButtons({
  onExport,
}: ReportsBreadcrumbButtonsProps) {
  const handleExport = () => {
    if (onExport) {
      onExport();
    } else {
      console.log('Exportar relatório csv');
    }
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleExport}
        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
      >
        <Download size={16} aria-hidden />
        Baixar Relatório
      </button>
    </div>
  );
}
