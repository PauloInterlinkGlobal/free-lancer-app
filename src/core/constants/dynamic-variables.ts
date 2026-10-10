export interface DynamicVariable {
  key: string;
  label: string;
  description: string;
  exemplo: string;
}

/** Variáveis do sistema (sempre disponíveis, vindas do contacto). */
export const DYNAMIC_VARIABLES: readonly DynamicVariable[] = [
  {
    key: 'firstName',
    label: 'Primeiro nome',
    description: 'Primeiro nome do contacto',
    exemplo: 'Ana',
  },
  {
    key: 'lastName',
    label: 'Sobrenome',
    description: 'Último nome ou apelido',
    exemplo: 'Ferreira',
  },
  {
    key: 'fullName',
    label: 'Nome completo',
    description: 'Nome e sobrenome combinados',
    exemplo: 'Ana Ferreira',
  },
  {
    key: 'phone',
    label: 'Telemóvel',
    description: 'Número de telefone com prefixo',
    exemplo: '+244 923 456 789',
  },
  {
    key: 'email',
    label: 'Email',
    description: 'Endereço de email do contacto',
    exemplo: 'ana.ferreira@sonangol.ao',
  },
  {
    key: 'group',
    label: 'Grupo',
    description: 'Nome do grupo de contactos',
    exemplo: 'Clientes',
  },
] as const;

/** Chaves reservadas: não podem ser usadas como variáveis personalizadas. */
const RESERVED_KEYS: ReadonlySet<string> = new Set(
  DYNAMIC_VARIABLES.map((variable) => variable.key)
);

/**
 * Exemplos para variáveis personalizadas. Fonte única usada pelo dropdown
 * e pela pré-visualização, para que mostrem sempre o mesmo valor.
 */
const CUSTOM_VARIABLE_EXAMPLES: Readonly<Record<string, string>> = {
  empresa: 'Sonangol',
  cidade: 'Luanda',
  cargo: 'Gestor',
  desconto: '15%',
};

export function getCustomVariableExample(key: string): string {
  return Object.prototype.hasOwnProperty.call(CUSTOM_VARIABLE_EXAMPLES, key)
    ? CUSTOM_VARIABLE_EXAMPLES[key]
    : `Valor de ${key}`;
}

export interface VariableCategoryOptions {
  contacto: DynamicVariable[];
  personalizadas: DynamicVariable[];
}

/**
 * Opções do dropdown de variáveis.
 * Ignora chaves vazias, reservadas e repetidas, e mantém a ordem recebida.
 */
export function buildVariableOptions(
  customKeys: string[] = []
): VariableCategoryOptions {
  const seen = new Set<string>();
  const personalizadas: DynamicVariable[] = [];

  for (const raw of customKeys) {
    const key = raw.trim();
    if (!key || RESERVED_KEYS.has(key) || seen.has(key)) continue;
    seen.add(key);

    personalizadas.push({
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      description: `Variável personalizada "${key}"`,
      exemplo: getCustomVariableExample(key),
    });
  }

  return {
    contacto: [...DYNAMIC_VARIABLES],
    personalizadas,
  };
}
