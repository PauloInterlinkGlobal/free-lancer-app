export type ContactStatus = 'active' | 'inactive' | 'blocked';
export type ContactSex = 'male' | 'female';

export interface IContact {
  id: string;
  name: string; // Primeiro nome
  surname?: string; // Sobrenome
  number: string;
  email?: string;
  sex?: ContactSex;
  date: string;
  groups: string[];
  variables?: Record<string, string>;
  status: ContactStatus;
}

export interface ICreateContactInput {
  name: string;
  surname?: string;
  number: string;
  email?: string;
  groups: string[];
  variables: Record<string, string>;
}

// Erros devolvidos pela Server Action de criação. Os erros de variáveis são
// por chave; os de linha (chave vazia ou repetida) são por índice da linha.
export interface ContactFormErrors {
  name?: string;
  surname?: string;
  number?: string;
  email?: string;
  groups?: string;
  generalVariables?: string;
  variables?: Record<string, string>;
  rows?: Record<string, string>;
  form?: string;
}

export interface ContactFormState {
  ok: boolean;
  errors: ContactFormErrors;
}
