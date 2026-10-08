import type { TeamRole } from '../interfaces/team';

export const roleLabel: Record<TeamRole, string> = {
  admin: 'Administrador',
  manager: 'Gestor',
  sales: 'Comercial',
};

export const roleHint: Record<TeamRole, string> = {
  admin: 'Gere a equipa e as configurações',
  manager: 'Vê pagamentos e relatórios',
  sales: 'Envia SMS e gere contactos',
};

export const roles: TeamRole[] = ['admin', 'manager', 'sales'];

export type GroupKey = TeamRole;

export const groupOrder: GroupKey[] = ['admin', 'manager', 'sales'];

export const groupMeta: Record<GroupKey, { label: string; dot: string }> = {
  admin: {
    label: 'Administração',
    dot: 'bg-[rgb(var(--color-text-primary))]',
  },
  manager: { label: 'Gestão', dot: 'bg-primary' },
  sales: { label: 'Comercial', dot: 'bg-primary/50' },
};
