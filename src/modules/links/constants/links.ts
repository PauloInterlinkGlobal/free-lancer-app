import { LinkStatus } from '../interfaces/links';

export const ALL = 'all';

export const linkStatusLabel: Record<LinkStatus, string> = {
  pending: 'Pendente',
  approved: 'Aprovado',
  rejected: 'Rejeitado',
};

export const linkStatusStyles: Record<LinkStatus, string> = {
  approved:
    'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20',
  pending:
    'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20',
  rejected:
    'bg-rose-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20',
};

export const linkStatusTextStyles: Record<LinkStatus, string> = {
  approved: 'text-emerald-500',
  pending: 'text-amber-500',
  rejected: 'text-rose-500',
};
