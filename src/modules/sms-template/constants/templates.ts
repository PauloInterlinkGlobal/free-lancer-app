import { SelectOption } from '@/core/components/Select';

export const TEMPLATE_CATEGORIES: SelectOption[] = [
  { value: '', label: 'Todas as categorias' },
  { value: 'promocional', label: 'Promocional' },
  { value: 'transacional', label: 'Transacional' },
  { value: 'notificacao', label: 'Notificação' },
  { value: 'cobranca', label: 'Cobrança' },
];

export const TEMPLATE_SORT_OPTIONS: SelectOption[] = [
  { value: 'recent', label: 'Mais recentes' },
  { value: 'name', label: 'Nome (A-Z)' },
  { value: 'variables', label: 'Nº de Variáveis' },
];

export const CATEGORY_BADGE_STYLES: Record<
  string,
  { label: string; className: string }
> = {
  promocional: {
    label: 'PROMOCIONAL',
    className: 'bg-primary/10 text-primary border-primary/20',
  },
  transacional: {
    label: 'TRANSACIONAL',
    className:
      'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  },
  notificacao: {
    label: 'NOTIFICAÇÃO',
    className:
      'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  },
  cobranca: {
    label: 'COBRANÇA',
    className:
      'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
  },
};
