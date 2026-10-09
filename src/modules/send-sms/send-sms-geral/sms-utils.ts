import { DYNAMIC_VARIABLES } from '@/core/constants/dynamic-variables';

const GSM_REGEX =
  /^[A-Za-z0-9 \r\n@£$¥èéùìòÇØøÅåΔ_ΦΓΛΩΠΨΣΘΞÆæßÉ!"#¤%&'()*+,\-./:;<=>?¡ÄÖÑÜ§¿äöñüà^{}\\[~\]|€]*$/;

export function getSmsInfo(text: string) {
  const isGsm = GSM_REGEX.test(text);
  const length = text.length;
  const single = isGsm ? 160 : 70;
  const multi = isGsm ? 153 : 67;
  const segments =
    length === 0 ? 0 : length <= single ? 1 : Math.ceil(length / multi);

  // quanto do SMS actual já está preenchido (0 a 1)
  const limit = segments <= 1 ? single : multi * segments;
  const progress = length === 0 ? 0 : Math.min(length / limit, 1);
  const remaining = Math.max(limit - length, 0);

  return { length, segments, isGsm, progress, remaining, limit };
}

export function removeAccents(text: string) {
  return text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function formatKz(value: number) {
  return `${new Intl.NumberFormat('pt-PT', {
    maximumFractionDigits: 2,
  }).format(value)} Kz`;
}

/** Exemplo usado na pré-visualização */
export const PREVIEW_VARIABLES: Record<string, string> = {
  ...DYNAMIC_VARIABLES.reduce(
    (acc, v) => {
      acc[v.key] = v.exemplo;
      return acc;
    },
    {} as Record<string, string>
  ),
  // Compatibilidade com chaves legadas e variáveis comuns
  nome: 'Ana',
  empresa: 'Sonangol',
  cidade: 'Luanda',
};

export function fillVariables(text: string): string {
  // 1. Substitui sintaxe nova {{ chave }} (aceita espaços internos opcionais)
  let filled = text.replace(
    /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g,
    (match, key: string) => PREVIEW_VARIABLES[key] ?? match
  );

  // 2. Substitui sintaxe antiga { chave } para compatibilidade retroativa
  filled = filled.replace(
    /(?<!\{)\{([a-zA-Z0-9_]+)\}(?!\})/g,
    (match, key: string) => PREVIEW_VARIABLES[key] ?? match
  );

  return filled;
}
