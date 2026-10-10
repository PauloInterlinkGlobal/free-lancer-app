import {
  DYNAMIC_VARIABLES,
  getCustomVariableExample,
} from '@/core/constants/dynamic-variables';

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

export function formatSms(value: number) {
  return `${new Intl.NumberFormat('pt-PT', {
    maximumFractionDigits: 0,
  }).format(value)} SMS`;
}

/** Exemplos usados na pré-visualização (variáveis do sistema + legadas). */
export const PREVIEW_VARIABLES: Readonly<Record<string, string>> = {
  ...Object.fromEntries(DYNAMIC_VARIABLES.map((v) => [v.key, v.exemplo])),
  // Compatibilidade com chaves legadas (sintaxe antiga {chave} continua a funcionar sem customKeys)
  nome: 'Ana',
  empresa: getCustomVariableExample('empresa'),
  cidade: getCustomVariableExample('cidade'),
};

/**
 * Valor de exemplo para uma chave, ou `undefined` se a chave não for conhecida.
 * Usa propriedade própria, para que chaves como `constructor` ou `toString`
 * não resolvam para propriedades herdadas do objeto.
 */
function exampleFor(key: string, customKeys: readonly string[]) {
  if (Object.prototype.hasOwnProperty.call(PREVIEW_VARIABLES, key)) {
    return PREVIEW_VARIABLES[key];
  }
  if (customKeys.includes(key)) return getCustomVariableExample(key);
  return undefined;
}

/**
 * Substitui variáveis pelos exemplos da pré-visualização.
 * - `{{chave}}` (aceita espaços internos) é a sintaxe atual.
 * - `{chave}` é a sintaxe antiga, mantida por compatibilidade.
 * - Chaves desconhecidas ficam como estão, para se verem os erros de digitação.
 * - `customKeys` são as variáveis personalizadas do contexto (opcional).
 */
export function fillVariables(
  text: string,
  customKeys: readonly string[] = []
): string {
  // 1. Sintaxe atual {{ chave }}
  let filled = text.replace(
    /\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g,
    (match, key: string) => exampleFor(key, customKeys) ?? match
  );

  // 2. Sintaxe antiga { chave }, sem tocar em {{ chave }} já tratada
  filled = filled.replace(
    /(?<!\{)\{([a-zA-Z0-9_]+)\}(?!\})/g,
    (match, key: string) => exampleFor(key, customKeys) ?? match
  );

  return filled;
}
