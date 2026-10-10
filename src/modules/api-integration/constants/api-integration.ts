import type {
  ApiKeyStatus,
  ApiLogSource,
} from '@/modules/api-integration/interfaces/api-integration';

export const ALL = 'all';

export const LOGS_PER_PAGE = 5;

export const webhookEvents = [
  { value: 'sms.delivered', label: 'SMS entregue' },
  { value: 'sms.failed', label: 'SMS falhado' },
  { value: 'balance.low', label: 'Saldo baixo' },
] as const;

export const apiKeyStatusLabel: Record<ApiKeyStatus, string> = {
  active: 'Ativa',
  revoked: 'Revogada',
};

export const apiKeyStatusStyles: Record<ApiKeyStatus, string> = {
  active: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  revoked: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
};

export const logSourceLabel: Record<ApiLogSource, string> = {
  api: 'API',
  webhook: 'Webhook',
};

export const logSourceStyles: Record<ApiLogSource, string> = {
  api: 'bg-primary/10 text-primary',
  webhook: 'bg-secondary/10 text-secondary',
};

export const statusCodeStyles = (code: number) =>
  code < 300
    ? 'text-emerald-600 dark:text-emerald-400'
    : code < 500
      ? 'text-amber-600 dark:text-amber-400'
      : 'text-rose-600 dark:text-rose-400';
