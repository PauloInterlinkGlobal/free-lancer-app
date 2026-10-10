export const MAX_URL_LENGTH = 2048;

// Esquemas explícitos (ex.: ftp://, javascript:, data:) não devem receber
// "https://" à frente — ficam como estão para isValidUrl os rejeitar.
const EXPLICIT_SCHEME = /^[a-z][a-z0-9+.-]*:\/\//i;
const NON_HTTP_SCHEME = /^(javascript|data|vbscript|file|mailto|tel|blob):/i;

export function normalizeUrl(input: string): string {
  const trimmed = input.trim();
  if (!trimmed) return '';

  if (EXPLICIT_SCHEME.test(trimmed) || NON_HTTP_SCHEME.test(trimmed)) {
    return trimmed;
  }

  return `https://${trimmed}`;
}

// Esquema duplicado colado dentro de http(s)://, ex.: https://ftp://x.ao
const NESTED_SCHEME = /^https?:\/\/[^/]*:\/\//i;

export function isValidUrl(url: string): boolean {
  if (!url || url.length > MAX_URL_LENGTH) {
    return false;
  }

  if (NESTED_SCHEME.test(url)) {
    return false;
  }

  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export const DESCRIPTION_MIN_LENGTH = 3;
export const DESCRIPTION_MAX_LENGTH = 120;

// Forma canónica para comparar duplicados: o `URL` normaliza o host (maiúsculas/minúsculas)
// e mantém o caminho tal como foi escrito, pelo que /Promo e /promo não são duplicados.
export function toCanonicalUrl(value: string): string {
  const normalized = normalizeUrl(value);
  try {
    return new URL(normalized).href;
  } catch {
    return normalized;
  }
}

export interface LinkInputErrors {
  url?: string;
  description?: string;
}

// Regras partilhadas entre o formulário (cliente) e a Server Action (servidor).
// Sem `existingUrls`, só valida o formato. Com `existingUrls`, também recusa duplicados.
export function validateLinkInput(
  input: { url: string; description: string },
  existingUrls: string[] = []
): LinkInputErrors {
  const errors: LinkInputErrors = {};

  const rawUrl = input.url.trim();
  if (!rawUrl) {
    errors.url = 'O URL é obrigatório.';
  } else {
    const normalized = normalizeUrl(rawUrl);
    if (normalized.length > MAX_URL_LENGTH) {
      errors.url = `O URL não pode ter mais de ${MAX_URL_LENGTH} caracteres.`;
    } else if (!isValidUrl(normalized)) {
      errors.url = 'Insira um URL válido com protocolo http ou https.';
    } else {
      const canonical = toCanonicalUrl(normalized);
      if (existingUrls.some((existing) => toCanonicalUrl(existing) === canonical)) {
        errors.url = 'Este URL já se encontra registado.';
      }
    }
  }

  const trimmedDesc = input.description.trim();
  if (!trimmedDesc) {
    errors.description = 'A descrição é obrigatória.';
  } else if (trimmedDesc.length < DESCRIPTION_MIN_LENGTH) {
    errors.description = `A descrição deve ter no mínimo ${DESCRIPTION_MIN_LENGTH} caracteres.`;
  } else if (trimmedDesc.length > DESCRIPTION_MAX_LENGTH) {
    errors.description = `A descrição não pode ter mais de ${DESCRIPTION_MAX_LENGTH} caracteres.`;
  }

  return errors;
}
