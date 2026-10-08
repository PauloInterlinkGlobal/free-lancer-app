import {
  ContactSex,
  ContactStatus,
} from '@/modules/contacts/contacts-geral/interfaces/contacts';

export const statusLabel: Record<ContactStatus, string> = {
  active: 'Activo',
  inactive: 'Inactivo',
  blocked: 'Bloqueado',
};

export const sexLabel: Record<ContactSex, string> = {
  male: 'Masculino',
  female: 'Feminino',
};

export const ALL = 'all';
