export type ContactStatus = 'active' | 'inactive' | 'blocked';
export type ContactSex = 'male' | 'female';

export interface IContact {
  id: string;
  name: string;
  number: string;
  sex: ContactSex;
  date: string;
  groups: string[];
  status: ContactStatus;
}
