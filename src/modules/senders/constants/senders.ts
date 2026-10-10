import {
  AlertCircle,
  CheckCircle2,
  Clock,
  type LucideIcon,
} from 'lucide-react';
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

export const senderStatusBadgeStyles: Record<SenderStatus, string> = {
  validated: 'text-emerald-600 dark:text-emerald-400',
  pending: 'text-amber-600 dark:text-amber-400',
  rejected: 'text-rose-600 dark:text-rose-400',
};

export const senderStatusIcons: Record<SenderStatus, LucideIcon> = {
  validated: CheckCircle2,
  pending: Clock,
  rejected: AlertCircle,
};
