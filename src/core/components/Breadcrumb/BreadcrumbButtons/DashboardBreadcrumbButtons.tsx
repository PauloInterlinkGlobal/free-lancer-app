"use client";

import { useModalStore } from "@/core/store/useModalStore";
import { FileBarChart } from "lucide-react";

export function DashboardBreadcrumbButtons() {
  const { openModal } = useModalStore();

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => openModal("GENERATE_DASHBOARD_REPORT")}
        className="flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
      >
        <FileBarChart size={16} aria-hidden />
        Gerar relatório
      </button>
    </div>
  );
}
