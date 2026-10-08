export type ReportPeriodType =
  "daily" | "weekly" | "monthly" | "quarterly" | "yearly" | "custom";

export interface ReportPeriod {
  type: ReportPeriodType;
  /** YYYY-MM-DD */
  startDate: string;
  /** YYYY-MM-DD */
  endDate: string;
}

export interface ReportStat {
  label: string;
  value: string;
  trend: string;
  trendUp: boolean;
}

export interface ReportSeriesPoint {
  label: string;
  enviados: number;
  entregues: number;
}

export interface ReportData {
  title: string;
  period: ReportPeriod;
  generatedAt: string;
  stats: ReportStat[];
  series: ReportSeriesPoint[];
}
