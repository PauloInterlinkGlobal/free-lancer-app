'use client';

import { useModalStore } from '@/core/store/useModalStore';
import { FileSpreadsheet } from 'lucide-react';

export function ReportsBreadcrumbButtons() {
  const { openModal } = useModalStore();

  return (
    <div className="flex w-full items-center sm:w-auto">
      <button
        type="button"
        onClick={() => openModal('GENERATE_REPORT')}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98] sm:w-auto"
      >
        <FileSpreadsheet size={17} aria-hidden />
        Exportar relatório
      </button>
    </div>
  );
}
