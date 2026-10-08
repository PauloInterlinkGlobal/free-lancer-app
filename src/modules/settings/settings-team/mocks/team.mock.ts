import type { ITeamMember } from '../interfaces/team';

export const teamMock: ITeamMember[] = [
  {
    id: 'm1',
    name: 'Euclides Baltazar',
    email: 'euclides@empresa.ao',
    role: 'admin',
    status: 'active',
    lastActive: '2026-10-06T08:40:00+01:00',
  },
  {
    id: 'm2',
    name: 'Ana Ferreira',
    email: 'ana@empresa.ao',
    role: 'admin',
    status: 'active',
    lastActive: '2026-10-06T07:10:00+01:00',
  },
  {
    id: 'm3',
    name: 'Paulo Mendes',
    email: 'paulo@empresa.ao',
    role: 'manager',
    status: 'active',
    lastActive: '2026-10-05T17:25:00+01:00',
  },
  {
    id: 'm4',
    name: 'Joana Kiala',
    email: 'joana@empresa.ao',
    role: 'sales',
    status: 'active',
    lastActive: '2026-10-06T08:05:00+01:00',
  },
  {
    id: 'm5',
    name: 'Tiago Matias',
    email: 'tiago@empresa.ao',
    role: 'sales',
    status: 'active',
    lastActive: '2026-10-04T15:00:00+01:00',
  },
];
