import {
  HistorySendingType,
  HistorySmsType,
} from '@/modules/history/interfaces/history';

export const smsTypeLabel: Record<HistorySmsType, string> = {
  scheduled: 'Agendado',
  immediate: 'Imediato',
};

export const sendingTypeLabel: Record<HistorySendingType, string> = {
  normal: 'Normal',
  flash: 'Flash',
};

export const ALL = 'all';
