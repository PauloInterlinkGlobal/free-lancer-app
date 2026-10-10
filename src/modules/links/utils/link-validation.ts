export const MAX_URL_LENGTH = 2048;
export const MIN_DESCRIPTION_LENGTH = 3;
export const MAX_DESCRIPTION_LENGTH = 120;

export interface LinkInputValues {
  url: string;
  description: string;
}

export interface LinkInputErrors {
  url?: string;
  description?: string;
}

export interface LinkInputValidationResult {
  ok: boolean;
  errors: LinkInputErrors;
  values: LinkInputValues;
}

/** Remove espaços nas extremidades e acrescenta https:// quando não há protocolo. */
export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  // Preserva protocolos fornecidos (incluindo protocolos inválidos), para que
  // isValidUrl os possa rejeitar em vez de os transformar num URL https válido.
  if (/^[a-z][a-z\d+.-]*:/i.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

/** Aceita apenas URLs absolutos http/https com, no máximo, 2048 caracteres. */
export function isValidUrl(url: string): boolean {
  if (!url || url.length > MAX_URL_LENGTH) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return (
      (parsed.protocol === 'http:' || parsed.protocol === 'https:') &&
      Boolean(parsed.hostname)
    );
  } catch {
    return false;
  }
}

/** Validação pura, reutilizável em Server Actions e em componentes cliente. */
export function validateLinkInput(
  input: LinkInputValues
): LinkInputValidationResult {
  const values: LinkInputValues = {
    url: normalizeUrl(input.url ?? ''),
    description: (input.description ?? '').trim(),
  };
  const errors: LinkInputErrors = {};

  if (!input.url?.trim()) {
    errors.url = 'O URL é obrigatório.';
  } else if (values.url.length > MAX_URL_LENGTH) {
    errors.url = `O URL não pode exceder ${MAX_URL_LENGTH} caracteres.`;
  } else if (!isValidUrl(values.url)) {
    errors.url = 'Insira um URL válido com protocolo http ou https.';
  }

  if (!values.description) {
    errors.description = 'A descrição é obrigatória.';
  } else if (values.description.length < MIN_DESCRIPTION_LENGTH) {
    errors.description = `A descrição deve ter no mínimo ${MIN_DESCRIPTION_LENGTH} caracteres.`;
  } else if (values.description.length > MAX_DESCRIPTION_LENGTH) {
    errors.description = `A descrição não pode ter mais de ${MAX_DESCRIPTION_LENGTH} caracteres.`;
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors,
    values,
  };
}
