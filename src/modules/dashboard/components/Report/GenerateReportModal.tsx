"use client";

import { DatePicker } from "@/core/components/DatePicker";
import { Modal } from "@/core/components/Modal";
import { useToastStore } from "@/core/store";
import { useModalStore } from "@/core/store/useModalStore";
import { Check, FileBarChart, Loader2, X } from "lucide-react";
import { useMemo, useState } from "react";
import { REPORT_PERIOD_OPTIONS } from "../../constants/report";
import type { ReportPeriodType } from "../../interfaces/report";
import { generateDashboardReport } from "../../utils/generate-report-svg";
import {
  formatDisplayDate,
  resolvePeriod,
  toDateStr,
} from "../../utils/report-period";

export function GenerateReportModal() {
  const { closeModal } = useModalStore();
  const { success, error } = useToastStore();

  const today = useMemo(() => toDateStr(new Date()), []);
  const [type, setType] = useState<ReportPeriodType>("monthly");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState(today);
  const [dateError, setDateError] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  const preview = useMemo(
    () => (type === "custom" ? null : resolvePeriod(type)),
    [type],
  );

  const reset = () => {
    setType("monthly");
    setStartDate("");
    setEndDate(today);
    setDateError("");
  };

  const handleClose = () => {
    if (isGenerating) return;
    reset();
    closeModal();
  };

  const handleGenerate = async () => {
    setDateError("");

    if (type === "custom") {
      if (!startDate || !endDate) {
        setDateError("Selecione a data de início e de fim.");
        return;
      }
      if (startDate > endDate) {
        setDateError("A data de início deve ser anterior à data de fim.");
        return;
      }
    }

    setIsGenerating(true);
    try {
      const period = resolvePeriod(type, { startDate, endDate });
      // Pequena latência para feedback visual (dados mock)
      await new Promise((r) => setTimeout(r, 500));
      const { fileName } = await generateDashboardReport(period);
      success(`Relatório gerado: ${fileName}`);
      reset();
      closeModal();
    } catch {
      error("Não foi possível gerar o relatório. Tente novamente.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Modal id="GENERATE_DASHBOARD_REPORT" onClose={handleClose}>
      <div className="w-full max-w-lg overflow-hidden rounded-2xl border border-ui bg-surface shadow-2xl">
        {/* Header */}
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
                Escolha o período e exporte o resumo do dashboard em SVG.
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

        {/* Body */}
        <div className="flex flex-col gap-5 px-6 py-5">
          <fieldset className="flex flex-col gap-2">
            <legend className="mb-2 text-sm font-medium text-primary-content">
              Tipo de relatório
            </legend>

            <div
              role="radiogroup"
              className="grid grid-cols-2 gap-2 sm:grid-cols-3"
            >
              {REPORT_PERIOD_OPTIONS.map((opt) => {
                const active = opt.value === type;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => {
                      setType(opt.value);
                      setDateError("");
                    }}
                    className={`relative flex flex-col items-start rounded-xl border px-3 py-2.5 text-left transition-colors ${
                      active
                        ? "border-primary bg-primary/5"
                        : "border-ui bg-surface hover:bg-item-hover"
                    }`}
                  >
                    <span
                      className={`text-sm font-medium ${active ? "text-primary" : "text-primary-content"}`}
                    >
                      {opt.label}
                    </span>
                    <span className="text-[11px] text-muted-content">
                      {opt.description}
                    </span>
                    {active && (
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

          {type === "custom" ? (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              <DatePicker
                label="Data de início"
                value={startDate}
                onChange={(v) => {
                  setStartDate(v);
                  setDateError("");
                }}
                maxDate={endDate || today}
              />
              <DatePicker
                label="Data de fim"
                value={endDate}
                onChange={(v) => {
                  setEndDate(v);
                  setDateError("");
                }}
                minDate={startDate || undefined}
                maxDate={today}
              />
              {dateError && (
                <p className="text-xs font-medium text-red-500 sm:col-span-2">
                  {dateError}
                </p>
              )}
            </div>
          ) : (
            preview && (
              <p className="rounded-xl bg-surface-raised px-4 py-3 text-xs text-muted-content">
                Período:{" "}
                <span className="font-medium text-primary-content">
                  {formatDisplayDate(preview.startDate)}
                </span>{" "}
                —{" "}
                <span className="font-medium text-primary-content">
                  {formatDisplayDate(preview.endDate)}
                </span>
              </p>
            )
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-2 border-t border-divider px-6 py-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isGenerating}
            className="rounded-xl px-5 py-2.5 text-sm font-medium text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content disabled:cursor-not-allowed disabled:opacity-50"
          >
            Cancelar
          </button>

          <button
            type="button"
            onClick={handleGenerate}
            disabled={isGenerating}
            className="flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isGenerating ? (
              <Loader2 size={16} className="animate-spin" aria-hidden />
            ) : (
              <FileBarChart size={16} aria-hidden />
            )}
            {isGenerating ? "A gerar…" : "Gerar relatório"}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default GenerateReportModal;
