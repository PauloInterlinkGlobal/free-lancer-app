'use client';

import { useModalStore } from '@/core/store/useModalStore';
import { FileBarChart } from 'lucide-react';

export function ReportsBreadcrumbButtons() {
  const { openModal } = useModalStore();

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => openModal('GENERATE_REPORT')}
        className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98]"
      >
        <FileBarChart size={16} aria-hidden />
        Gerar relatório
      </button>
    </div>
  );
}
