import type { SelectOption } from '@/core/components/Select';
import type { CampaignStatus, ReportExportPeriod } from '../interfaces/reports';

export const ALL = 'all';
export const ALL_PERIODS = 'all';

export const REPORT_EXPORT_PERIODS: {
  value: ReportExportPeriod;
  label: string;
  description: string;
}[] = [
  { value: 'daily', label: 'Diário', description: 'Atividade de hoje' },
  { value: 'weekly', label: 'Semanal', description: 'Últimos 7 dias' },
  { value: 'monthly', label: 'Mensal', description: 'Últimos 30 dias' },
];

export const PERIOD_OPTIONS: SelectOption[] = [
  { value: 'today', label: 'Hoje' },
  { value: 'yesterday', label: 'Ontem' },
  { value: '7d', label: 'Últimos 7 dias' },
  { value: '30d', label: 'Últimos 30 dias' },
  { value: 'this_month', label: 'Este Mês' },
  { value: '90d', label: 'Últimos 90 dias' },
  { value: 'this_year', label: 'Este Ano' },
  { value: ALL_PERIODS, label: 'Todo o Período' },
];

export const SENDER_OPTIONS: SelectOption[] = [
  { value: ALL, label: 'Todos os senders' },
  { value: 'SMSILLICO', label: 'SMSILLICO' },
  { value: 'JV-SERVICES', label: 'JV-SERVICES' },
  { value: 'ALERTA-OTP', label: 'ALERTA-OTP' },
  { value: 'PROMO-SMS', label: 'PROMO-SMS' },
];

export const STATUS_OPTIONS: SelectOption[] = [
  { value: ALL, label: 'Todos os Estados' },
  { value: 'COMPLETED', label: 'Concluída' },
  { value: 'IN_PROGRESS', label: 'Em Progresso' },
  { value: 'SCHEDULED', label: 'Agendada' },
  { value: 'FAILED', label: 'Falhada' },
];

export const campaignStatusStyles: Record<CampaignStatus, string> = {
  COMPLETED: 'bg-emerald-500/10 text-emerald-500 font-semibold',
  IN_PROGRESS: 'bg-primary/10 text-primary font-semibold',
  SCHEDULED: 'bg-amber-500/10 text-amber-500 font-semibold',
  FAILED: 'bg-rose-500/10 text-rose-500 font-semibold',
};

export const campaignStatusLabel: Record<CampaignStatus, string> = {
  COMPLETED: 'Concluída',
  IN_PROGRESS: 'Em Progresso',
  SCHEDULED: 'Agendada',
  FAILED: 'Falhada',
};
