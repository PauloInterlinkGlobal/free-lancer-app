import type {
  MessageOrigin,
  MessageStatus,
} from '../interfaces/contact-details';

export const messageStatusLabel: Record<MessageStatus, string> = {
  delivered: 'Entregue',
  sent: 'Enviada',
  pending: 'Pendente',
  failed: 'Falhou',
};

export const messageStatusStyles: Record<MessageStatus, string> = {
  delivered: 'bg-green-500/10 text-green-500',
  sent: 'bg-primary/10 text-primary',
  pending: 'bg-amber-500/10 text-amber-500',
  failed: 'bg-red-500/10 text-red-500',
};

export const messageOriginLabel: Record<MessageOrigin, string> = {
  campaign: 'Campanha',
  quick: 'Envio rápido',
  api: 'API',
};

const dateTimeFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Africa/Luanda',
});

export const formatDateTime = (iso: string | null) =>
  iso ? dateTimeFormatter.format(new Date(iso)) : '—';
