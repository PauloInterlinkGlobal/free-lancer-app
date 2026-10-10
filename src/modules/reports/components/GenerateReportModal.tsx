'use client';

import { Modal } from '@/core/components/Modal';
import { useModalStore } from '@/core/store/useModalStore';
import { useToastStore } from '@/core/store';
import { Calendar, Clock, FileSpreadsheet, FileText, X } from 'lucide-react';
import { useState } from 'react';
import { REPORT_EXPORT_PERIODS } from '../constants/reports';
import type {
  ICampaignReport,
  ReportExportPeriod,
} from '../interfaces/reports';
import {
  downloadCampaignReport,
  type ReportExportFormat,
} from '../utils/reports-csv';

interface GenerateReportModalProps {
  campaigns: ICampaignReport[];
}

const FORMAT_OPTIONS: {
  value: ReportExportFormat;
  label: string;
  description: string;
}[] = [
  {
    value: 'csv',
    label: 'CSV',
    description: 'Compatível com Excel e folhas de cálculo',
  },
  {
    value: 'xlsx',
    label: 'Excel (XLSX)',
    description: 'Ficheiro nativo do Microsoft Excel',
  },
];

export function GenerateReportModal({ campaigns }: GenerateReportModalProps) {
  const { closeModal } = useModalStore();
  const { success, error } = useToastStore();
  const [period, setPeriod] = useState<ReportExportPeriod>('monthly');
  const [format, setFormat] = useState<ReportExportFormat>('csv');

  const reset = () => {
    setPeriod('monthly');
    setFormat('csv');
  };

  const handleClose = () => {
    reset();
    closeModal();
  };

  const handleGenerate = () => {
    try {
      const report = downloadCampaignReport(campaigns, period, format);
      const formatLabel = format === 'xlsx' ? 'XLSX' : 'CSV';
      success(
        report.campaignCount > 0
          ? `Relatório ${formatLabel} gerado com ${report.campaignCount} campanha(s): ${report.fileName}`
          : `Relatório ${formatLabel} gerado sem campanhas neste período: ${report.fileName}`
      );
      reset();
      closeModal();
    } catch {
      error('Não foi possível gerar o relatório. Tente novamente.');
    }
  };

  const getPeriodIcon = (val: ReportExportPeriod) => {
    if (val === 'daily') return Clock;
    return Calendar;
  };

  return (
    <Modal id="GENERATE_REPORT" onClose={handleClose}>
      <div className="relative flex w-full max-w-lg max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100vh-3.5rem)] flex-col overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl sm:rounded-3xl">
        <div className="flex shrink-0 items-start justify-between border-b border-divider px-4 py-3.5 sm:px-6 sm:py-5">
          <div className="flex items-start gap-3">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary sm:h-12 sm:w-12 sm:rounded-2xl">
              <FileSpreadsheet
                size={20}
                className="sm:h-6 sm:w-6"
                aria-hidden
              />
            </span>
            <div>
              <h2 className="text-base font-bold text-primary-content sm:text-lg">
                Exportar relatório
              </h2>
              <p className="mt-0.5 text-xs text-muted-content sm:text-sm">
                Selecione o período e o formato do ficheiro.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="rounded-lg p-1.5 text-muted-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <div className="flex flex-1 flex-col gap-5 overflow-y-auto px-4 py-4 sm:px-6 sm:py-5">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-primary-content">
              Tipo de período
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {REPORT_EXPORT_PERIODS.map((option) => {
                const Icon = getPeriodIcon(option.value);
                const active = period === option.value;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setPeriod(option.value)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      active
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                        : 'border-border-ui bg-surface hover:border-primary/40 hover:bg-item-hover'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        active ? 'text-primary' : 'text-muted-content'
                      }
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-primary-content">
                        {option.label}
                      </span>
                      <span className="block text-xs text-muted-content">
                        {option.description}
                      </span>
                    </span>
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        active
                          ? 'border-primary bg-primary'
                          : 'border-border-ui bg-surface'
                      }`}
                      aria-hidden
                    >
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-primary-content">
              Formato do ficheiro
            </span>
            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
              {FORMAT_OPTIONS.map((option) => {
                const active = format === option.value;
                const Icon = option.value === 'xlsx' ? FileSpreadsheet : FileText;
                return (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => setFormat(option.value)}
                    className={`flex items-center gap-3 rounded-xl border p-3 text-left transition-all ${
                      active
                        ? 'border-primary bg-primary/5 ring-1 ring-primary/30'
                        : 'border-border-ui bg-surface hover:border-primary/40 hover:bg-item-hover'
                    }`}
                  >
                    <Icon
                      size={18}
                      className={
                        active ? 'text-primary' : 'text-muted-content'
                      }
                      aria-hidden
                    />
                    <span className="min-w-0 flex-1">
                      <span className="block text-sm font-semibold text-primary-content">
                        {option.label}
                      </span>
                      <span className="block text-xs text-muted-content">
                        {option.description}
                      </span>
                    </span>
                    <span
                      className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border ${
                        active
                          ? 'border-primary bg-primary'
                          : 'border-border-ui bg-surface'
                      }`}
                      aria-hidden
                    >
                      {active && (
                        <span className="h-1.5 w-1.5 rounded-full bg-white" />
                      )}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          <p className="rounded-xl border border-primary/15 bg-primary/5 px-3 py-2 text-xs text-primary">
            O ficheiro será descarregado diretamente no formato seleccionado.
          </p>
        </div>

        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-divider px-4 py-3 sm:px-6 sm:py-4">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-lg border border-border-ui bg-surface px-4 py-2 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleGenerate}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            <FileSpreadsheet size={16} aria-hidden />
            Descarregar {format === 'xlsx' ? 'XLSX' : 'CSV'}
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default GenerateReportModal;
