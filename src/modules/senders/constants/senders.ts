import { SenderStatus } from '../interfaces/senders';

export const ALL = 'all';

export const senderStatusLabel: Record<SenderStatus, string> = {
  validated: 'Validado',
  pending: 'Pendente',
  rejected: 'Rejeitado',
};

export const senderStatusStyles: Record<SenderStatus, string> = {
  validated: 'text-emerald-500',
  pending: 'text-amber-500',
  rejected: 'text-rose-500',
};
