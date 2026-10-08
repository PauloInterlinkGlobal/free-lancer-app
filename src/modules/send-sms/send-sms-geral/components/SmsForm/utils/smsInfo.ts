import { MessageSquare, Zap } from 'lucide-react';
import { SmsInfo } from '../types';

export const GSM_REGEX =
  /^[A-Za-z0-9 \r\n@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\[~\]|€]*$/;

export function getSmsInfo(text: string): SmsInfo {
  const isGsm = GSM_REGEX.test(text);
  const length = text.length;
  const single = isGsm ? 160 : 70;
  const multi = isGsm ? 153 : 67;
  const segments =
    length === 0 ? 0 : length <= single ? 1 : Math.ceil(length / multi);
  return { length, segments, isGsm };
}

export const SMS_TYPES = [
  { value: 'normal', label: 'Normal', icon: MessageSquare },
  { value: 'flash', label: 'Flash', icon: Zap },
] as const;
