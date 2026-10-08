import { SendingType } from '@/modules/send-sms/scheduled-sms/interfaces/scheduled-sms';

export const sendingTypeLabel: Record<SendingType, string> = {
  normal: 'Normal',
  flash: 'Flash',
};

export const ALL = 'all';
