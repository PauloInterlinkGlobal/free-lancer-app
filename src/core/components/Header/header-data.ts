export interface HeaderNotification {
  id: string;
  title: string;
  description: string;
  date: string;
  href: string;
}

// TODO: substituir por dados da API
export const smsBalanceMock = 12450;

export const recentNotificationsMock: HeaderNotification[] = [
  {
    id: '1',
    title: 'Envio concluído',
    description: 'Campanha "Promoção especial" entregue a 1250 contactos.',
    date: '2026-10-09T09:12:00Z',
    href: '/history',
  },
  {
    id: '2',
    title: 'Pagamento confirmado',
    description: 'Recarga de 5000 SMS adicionada à sua carteira.',
    date: '2026-10-08T16:40:00Z',
    href: '/payments',
  },
  {
    id: '3',
    title: 'Remetente aprovado',
    description: 'O remetente SMSILLICO foi aprovado.',
    date: '2026-10-08T11:05:00Z',
    href: '/senders',
  },
  {
    id: '4',
    title: 'Envio agendado',
    description: 'Mensagem agendada para 12/10 às 09:00.',
    date: '2026-10-07T18:20:00Z',
    href: '/send-sms/scheduled',
  },
  {
    id: '5',
    title: 'Saldo baixo',
    description: 'O seu saldo de SMS está abaixo de 15000.',
    date: '2026-10-06T08:00:00Z',
    href: '/payments',
  },
];
