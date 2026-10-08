import type { ReportPeriodType } from "../interfaces/report";

export const REPORT_PERIOD_OPTIONS: Array<{
  value: ReportPeriodType;
  label: string;
  description: string;
}> = [
  { value: "daily", label: "Diário", description: "Últimas 24 horas" },
  { value: "weekly", label: "Semanal", description: "Últimos 7 dias" },
  { value: "monthly", label: "Mensal", description: "Últimos 30 dias" },
  { value: "quarterly", label: "Trimestral", description: "Últimos 3 meses" },
  { value: "yearly", label: "Anual", description: "Últimos 12 meses" },
  { value: "custom", label: "Personalizado", description: "Escolha as datas" },
];

export const reportPeriodLabel: Record<ReportPeriodType, string> =
  Object.fromEntries(
    REPORT_PERIOD_OPTIONS.map((o) => [o.value, o.label]),
  ) as Record<ReportPeriodType, string>;
