import type { IContactGroup, ISenderId, ISmsTemplate } from '../interfaces';

export const SENDER_IDS_MOCK: ISenderId[] = [
  { id: '1', name: 'Zeno' },
  { id: '2', name: 'SMSillico' },
];

export const GROUPS_MOCK: IContactGroup[] = [
  { id: 'g1', name: 'Clientes VIP', total: 320 },
  { id: 'g2', name: 'Luanda', total: 1840 },
  { id: 'g3', name: 'Luanda', total: 1840 },
  { id: 'g4', name: 'Luanda', total: 1840 },
  { id: 'g5', name: 'Luanda', total: 1840 },
];

export const TEMPLATES_MOCK: ISmsTemplate[] = [
  {
    id: 't1',
    title: 'Vendas',
    content: 'Olá! Aproveite 20% de desconto até sexta-feira.',
  },
  {
    id: 't2',
    title: 'Promoção para Luanda',
    content:
      'Promoção exclusiva em Luanda: visite a nossa loja e ganhe um brinde.',
  },
  {
    id: 't3',
    title: 'Vendas',
    content: 'Olá! Aproveite 20% de desconto até sexta-feira.',
  },
  {
    id: 't4',
    title: 'Promoção para Luanda',
    content:
      'Promoção exclusiva em Luanda: visite a nossa loja e ganhe um brinde.',
  },
  {
    id: 't6',
    title: 'Vendas',
    content: 'Olá! Aproveite 20% de desconto até sexta-feira.',
  },
  {
    id: 't5',
    title: 'Promoção para Luanda',
    content:
      'Promoção exclusiva em Luanda: visite a nossa loja e ganhe um brinde.',
  },
];
