"use client";

import { Modal } from "@/core/components/Modal";
import { useModalStore } from "@/core/store/useModalStore";
import { useToastStore } from "@/core/store";
import { Check, FileBarChart, X } from "lucide-react";
import { useState } from "react";
import { REPORT_EXPORT_PERIODS } from "../constants/reports";
import type {
  ICampaignReport,
  ReportExportPeriod,
} from "../interfaces/reports";
import { downloadCampaignReportCsv } from "../utils/reports-csv";

interface GenerateReportModalProps {
  campaigns: ICampaignReport[];
}

export function GenerateReportModal({ campaigns }: GenerateReportModalProps) {
  const { closeModal } = useModalStore();
  const { success, error } = useToastStore();
  const [period, setPeriod] = useState<ReportExportPeriod>("monthly");

  const reset = () => setPeriod("monthly");

  const handleClose = () => {
    reset();
    closeModal();
  };

  const handleGenerate = () => {
    try {
      const report = downloadCampaignReportCsv(campaigns, period);
      success(
        report.campaignCount > 0
          ? `Relatório CSV gerado com ${report.campaignCount} campanha(s): ${report.fileName}`
          : `Relatório CSV gerado sem campanhas neste período: ${report.fileName}`,
      );
      reset();
      closeModal();
    } catch {
      error("Não foi possível gerar o relatório CSV. Tente novamente.");
    }
  };

  return (
    <Modal id="GENERATE_REPORT" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-ui bg-surface shadow-2xl">
        <div className="flex items-start justify-between border-b border-divider px-6 py-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <FileBarChart size={20} aria-hidden />
            </span>
            <div>
              <h2 className="text-lg font-semibold text-primary-content">
                Gerar relatório
              </h2>
              <p className="mt-1 text-xs text-muted-content">
                Escolha o período para exportar o relatório em CSV.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-5">
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium text-primary-content">
              Tipo de período
            </legend>

            <div
              role="radiogroup"
              className="grid grid-cols-1 gap-2 sm:grid-cols-3"
            >
              {REPORT_EXPORT_PERIODS.map((option) => {
                const isSelected = option.value === period;

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setPeriod(option.value)}
                    className={`relative flex min-h-20 flex-col items-start justify-center rounded-xl border px-3 py-2.5 text-left transition-colors ${
                      isSelected
                        ? "border-primary bg-primary/5"
                        : "border-ui bg-surface hover:bg-item-hover"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${isSelected ? "text-primary" : "text-primary-content"}`}
                    >
                      {option.label}
                    </span>
                    <span className="text-[11px] text-muted-content">
                      {option.description}
                    </span>
                    {isSelected && (
                      <Check
                        size={14}
                        aria-hidden
                        className="absolute right-2 top-2 text-primary"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </fieldset>
        </div>

        <div className="flex justify-end gap-2 border-t border-divider px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
          >
            <FileBarChart size={16} aria-hidden />
            Gerar CSV
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default GenerateReportModal;
