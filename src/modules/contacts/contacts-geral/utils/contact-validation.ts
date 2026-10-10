import { ICreateContactInput } from '../interfaces/contacts';

export const RESERVED_VARIABLE_KEYS = [
  'firstName',
  'lastName',
  'fullName',
  'phone',
  'email',
  'group',
] as const;

export const VARIABLE_KEY_REGEX = /^[a-z][a-zA-Z0-9_]{0,29}$/;
export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ContactValidationErrors {
  name?: string;
  surname?: string;
  number?: string;
  email?: string;
  variables?: Record<string, string>;
  generalVariables?: string;
}

export interface ValidateContactResult {
  isValid: boolean;
  errors: ContactValidationErrors;
  normalized?: ICreateContactInput;
}

export function extractAngolanPhoneDigits(phone: string): string {
  const digits = phone.replace(/\D/g, '');
  if (digits.startsWith('00244')) {
    return digits.slice(5);
  }
  if (digits.startsWith('244')) {
    return digits.slice(3);
  }
  return digits;
}

export function formatAngolanPhone(digits: string): string {
  return `+244 ${digits.slice(0, 3)} ${digits.slice(3, 6)} ${digits.slice(6, 9)}`;
}

export function validateContact(
  input: {
    name: string;
    surname?: string;
    number: string;
    email?: string;
    groups?: string[];
    variables?: Record<string, string>;
  },
  existingNumbers: string[] = []
): ValidateContactResult {
  const errors: ContactValidationErrors = {};

  // 1. Validação do Nome (2 a 50 caracteres)
  const trimmedName = (input.name || '').trim();
  if (!trimmedName) {
    errors.name = 'O nome é obrigatório.';
  } else if (trimmedName.length < 2) {
    errors.name = 'O nome deve ter no mínimo 2 caracteres.';
  } else if (trimmedName.length > 50) {
    errors.name = 'O nome não pode ter mais de 50 caracteres.';
  }

  // 2. Validação do Sobrenome (opcional, máx 50)
  const trimmedSurname = (input.surname || '').trim();
  if (trimmedSurname && trimmedSurname.length > 50) {
    errors.surname = 'O sobrenome não pode ter mais de 50 caracteres.';
  }

  // 3. Validação do Telemóvel (Angola +244, 9 dígitos começando por 9)
  const rawNumber = (input.number || '').trim();
  let normalizedNumber = '';

  if (!rawNumber) {
    errors.number = 'O número de telemóvel é obrigatório.';
  } else {
    const digits = extractAngolanPhoneDigits(rawNumber);
    if (!/^9\d{8}$/.test(digits)) {
      errors.number =
        'Insira um número angolano válido com 9 dígitos a começar por 9.';
    } else {
      normalizedNumber = formatAngolanPhone(digits);

      // Verificação de duplicados face à lista existente
      const isDuplicate = existingNumbers.some((existing) => {
        const existingDigits = extractAngolanPhoneDigits(existing);
        return existingDigits === digits;
      });

      if (isDuplicate) {
        errors.number = 'Este número de telemóvel já se encontra registado.';
      }
    }
  }

  // 4. Validação do Email (opcional, regex simples, máx 254)
  const trimmedEmail = (input.email || '').trim().toLowerCase();
  if (trimmedEmail) {
    if (trimmedEmail.length > 254 || !EMAIL_REGEX.test(trimmedEmail)) {
      errors.email = 'Insira um endereço de email válido.';
    }
  }

  // 5. Validação de Variáveis Personalizadas (máx 10, chaves válidas e não reservadas)
  const rawVariables = input.variables || {};
  const variableEntries = Object.entries(rawVariables);
  const normalizedVariables: Record<string, string> = {};
  const variableErrors: Record<string, string> = {};

  if (variableEntries.length > 10) {
    errors.generalVariables =
      'Pode adicionar no máximo 10 variáveis personalizadas.';
  }

  const seenKeys = new Set<string>();

  for (const [key, value] of variableEntries) {
    const trimmedKey = key.trim();
    const trimmedVal = (value || '').trim();

    if (!trimmedKey) {
      variableErrors[key] = 'A chave da variável é obrigatória.';
      continue;
    }

    if (seenKeys.has(trimmedKey)) {
      variableErrors[key] = `A chave "${trimmedKey}" está duplicada.`;
      continue;
    }
    seenKeys.add(trimmedKey);

    if (!VARIABLE_KEY_REGEX.test(trimmedKey)) {
      variableErrors[key] =
        'A chave deve começar por letra minúscula e conter apenas letras, números e underscores (máx. 30 caracteres).';
      continue;
    }

    if (
      RESERVED_VARIABLE_KEYS.includes(
        trimmedKey as (typeof RESERVED_VARIABLE_KEYS)[number]
      )
    ) {
      variableErrors[key] = `A chave "${trimmedKey}" é reservada pelo sistema.`;
      continue;
    }

    if (!trimmedVal) {
      variableErrors[key] = 'O valor da variável é obrigatório.';
      continue;
    }

    if (trimmedVal.length > 100) {
      variableErrors[key] = 'O valor não pode ter mais de 100 caracteres.';
      continue;
    }

    normalizedVariables[trimmedKey] = trimmedVal;
  }

  if (Object.keys(variableErrors).length > 0) {
    errors.variables = variableErrors;
  }

  const isValid =
    !errors.name &&
    !errors.surname &&
    !errors.number &&
    !errors.email &&
    !errors.generalVariables &&
    !errors.variables;

  return {
    isValid,
    errors,
    normalized: isValid
      ? {
          name: trimmedName,
          surname: trimmedSurname || undefined,
          number: normalizedNumber,
          email: trimmedEmail || undefined,
          groups: input.groups || [],
          variables: normalizedVariables,
        }
      : undefined,
  };
}
