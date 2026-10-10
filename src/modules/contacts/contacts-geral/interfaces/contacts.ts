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
