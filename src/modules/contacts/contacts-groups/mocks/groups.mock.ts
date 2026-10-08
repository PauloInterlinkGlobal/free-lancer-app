import { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';

export const groupsMock: IGroup[] = [
  {
    id: '1',
    name: 'Clientes',
    description: 'Todos os clientes activos com compras nos últimos 12 meses.',
    contactsCount: 1250,
  },
  {
    id: '2',
    name: 'VIP',
    description: 'Clientes premium que recebem ofertas e avisos exclusivos.',
    contactsCount: 86,
  },
  {
    id: '3',
    name: 'Newsletter',
    description: 'Subscritores da newsletter mensal com novidades e promoções.',
    contactsCount: 3420,
  },
  {
    id: '4',
    name: 'Parceiros',
    description: 'Fornecedores e parceiros comerciais.',
    contactsCount: 42,
  },
  {
    id: '5',
    name: 'Funcionários',
    description: 'Equipa interna, usada para comunicados e avisos gerais.',
    contactsCount: 1,
  },
  {
    id: '6',
    name: 'Encarregados de educação',
    description:
      'Pais e encarregados de educação para reuniões, avisos e calendário escolar.',
    contactsCount: 760,
  },
];
