export type CreateAccountStep = 1 | 2 | 3 | 4 | 5;

export interface ICompanyAddress {
  streetAddress: string;
  neighborhood: string;
  city: string;
  country: string;
}

export interface ICompanyFormData {
  // Task 1: Dados da Empresa
  companyName: string;
  taxId: string;
  sector: string;

  // Task 2: Endereço
  address?: ICompanyAddress;

  // Task 3: Contactos
  corporateEmail: string;
  phone: string;
  website: string;

  // Task 4: Confirmação de E-mail
  emailCode: string;

  // Task 5: Confirmação de Telefone
  phoneCode: string;
}

export interface ICompanyFormErrors {
  companyName?: string;
  taxId?: string;
  sector?: string;
  streetAddress?: string;
  neighborhood?: string;
  city?: string;
  country?: string;
  corporateEmail?: string;
  phone?: string;
  website?: string;
  emailCode?: string;
  phoneCode?: string;
  [key: string]: string | undefined;
}
