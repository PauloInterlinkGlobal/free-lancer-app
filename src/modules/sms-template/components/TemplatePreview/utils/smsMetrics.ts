import { SmsMetrics } from '../types';

export const GSM_REGEX =
  /^[A-Za-z0-9 \r\n@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\[~\]|€]*$/;

export function getSmsMetrics(text: string): SmsMetrics {
  const isGsm = GSM_REGEX.test(text);
  const length = text.length;
  const single = isGsm ? 160 : 70;
  const multi = isGsm ? 153 : 67;
  const segments =
    length === 0 ? 0 : length <= single ? 1 : Math.ceil(length / multi);
  return { length, segments, isGsm };
}

export function interpolateTemplateContent(
  content: string,
  sampleVariables: Record<string, string>,
  fillVariables: boolean
): string {
  if (!fillVariables) return content;

  return content.replace(/\{\{([^}]+)\}\}/g, (match, key) => {
    const trimmed = key.trim();
    return sampleVariables[trimmed] ?? `[${trimmed}]`;
  });
}
