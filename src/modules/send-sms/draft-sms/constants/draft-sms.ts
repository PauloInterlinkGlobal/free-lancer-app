import {
  DraftSendingType,
  DraftSmsType,
} from '@/modules/send-sms/draft-sms/interfaces/draft-sms';

export { ALL } from '@/core/helpers/table-filters';

export const smsTypeLabel: Record<DraftSmsType, string> = {
  immediate: 'Imediata',
  scheduled: 'Agendada',
};

export const sendingTypeLabel: Record<DraftSendingType, string> = {
  flash: 'Flash',
  normal: 'Normal',
};
