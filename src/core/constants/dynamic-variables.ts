export interface DynamicVariable {
  key: string;
  label: string;
  description: string;
  exemplo: string;
}

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

export interface VariableCategoryOptions {
  contacto: DynamicVariable[];
  personalizadas: DynamicVariable[];
}

export function buildVariableOptions(
  customKeys: string[] = []
): VariableCategoryOptions {
  const personalizadas: DynamicVariable[] = customKeys.map((key) => {
    let exemplo = `Valor de ${key}`;
    if (key === 'empresa') exemplo = 'Sonangol';
    else if (key === 'cidade') exemplo = 'Luanda';
    else if (key === 'cargo') exemplo = 'Gestor';
    else if (key === 'desconto') exemplo = '15%';

    return {
      key,
      label: key.charAt(0).toUpperCase() + key.slice(1),
      description: `Variável personalizada "${key}"`,
      exemplo,
    };
  });

  return {
    contacto: [...DYNAMIC_VARIABLES],
    personalizadas,
  };
}
