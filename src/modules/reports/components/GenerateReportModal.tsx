"use client";

import { Modal } from "@/core/components/Modal";
import { useModalStore } from "@/core/store/useModalStore";
import { useToastStore } from "@/core/store";
import { Calendar, Clock, FileSpreadsheet, X } from "lucide-react";
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

  const getPeriodIcon = (val: ReportExportPeriod) => {
    if (val === "daily") return Clock;
    return Calendar;
  };

  return (
    <Modal id="GENERATE_REPORT" onClose={handleClose}>
      <div className="relative flex w-full max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100vh-3.5rem)] flex-col overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl sm:rounded-3xl">
        {/* Header - Fixed / shrink-0 */}
        <div className="flex shrink-0 items-start justify-between border-b border-divider px-4 py-3.5 sm:px-6 sm:py-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12 sm:rounded-2xl">
              <FileSpreadsheet size={20} className="sm:h-6 sm:w-6" aria-hidden />
            </span>
            <div>
              <h2 className="text-base font-bold text-primary-content sm:text-lg">
                Exportar relatório
              </h2>
              <p className="mt-0.5 text-xs text-muted-content sm:mt-1">
                Selecione o período para exportar o relatório em formato CSV.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body - Scrollable / overflow-y-auto / flex-1 */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain px-4 py-4 sm:px-6 sm:py-5">
          <fieldset className="flex flex-col gap-2.5 sm:gap-3">
            <legend className="mb-1 text-xs font-semibold text-primary-content sm:mb-2 sm:text-sm">
              Tipo de período
            </legend>

            <div
              role="radiogroup"
              className="grid grid-cols-2 gap-2.5 sm:gap-3"
            >
              {REPORT_EXPORT_PERIODS.map((option) => {
                const isSelected = option.value === period;
                const Icon = getPeriodIcon(option.value);

                return (
                  <button
                    key={option.value}
                    type="button"
                    role="radio"
                    aria-checked={isSelected}
                    onClick={() => setPeriod(option.value)}
                    className={`flex items-center justify-between gap-2 rounded-xl p-2.5 text-left transition-all sm:rounded-2xl sm:p-3.5 ${
                      isSelected
                        ? "border-2 border-primary bg-primary/[0.04] shadow-sm"
                        : "border border-border-ui bg-surface hover:border-primary/40 hover:bg-item-hover"
                    }`}
                  >
                    <div className="flex min-w-0 items-center gap-2 sm:gap-3">
                      <Icon
                        size={18}
                        className={`shrink-0 sm:h-5 sm:w-5 ${isSelected ? "text-primary" : "text-muted-content"}`}
                        aria-hidden
                      />
                      <div className="min-w-0">
                        <span
                          className={`block truncate text-xs font-bold sm:text-sm ${
                            isSelected ? "text-primary" : "text-primary-content"
                          }`}
                        >
                          {option.label}
                        </span>
                        <span className="mt-0.5 block truncate text-[10px] text-muted-content sm:text-xs">
                          {option.description}
                        </span>
                      </div>
                    </div>

                    {/* Radio indicator */}
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-all sm:h-5 sm:w-5 ${
                        isSelected
                          ? "border-primary"
                          : "border-border-ui"
                      }`}
                    >
                      {isSelected && (
                        <span className="h-2 w-2 rounded-full bg-primary sm:h-2.5 sm:w-2.5" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Aviso CSV */}
            <div className="mt-2 rounded-xl border border-primary/20 bg-primary/5 px-3 py-2.5 text-center text-[11px] font-medium text-primary sm:rounded-2xl sm:px-4 sm:py-3 sm:text-xs">
              O ficheiro será descarregado diretamente em formato CSV.
            </div>
          </fieldset>
        </div>

        {/* Footer - Fixed / shrink-0 */}
        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-divider px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-xl px-4 py-2 text-xs font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content sm:px-5 sm:py-2.5 sm:text-sm"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            className="flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98] sm:px-5 sm:py-2.5 sm:text-sm"
          >
            <FileSpreadsheet size={15} aria-hidden />
            Descarregar CSV
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default GenerateReportModal;
