import type { LucideIcon } from 'lucide-react';
import {
  Ban,
  BarChart3,
  CalendarClock,
  ContactRound,
  CreditCard,
  FileText,
  FileUp,
  History,
  LayoutDashboard,
  Link2,
  MessageSquare,
  PenLine,
  Send,
  Settings,
  UsersRound,
} from 'lucide-react';

export interface NavSubItem {
  label: string;
  description?: string;
  href: string;
  icon: LucideIcon;
}

export interface NavItem {
  label: string;
  description?: string;
  href: string;
  matchPrefix?: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  subItems?: NavSubItem[];
}

const base = { iconBg: 'bg-primary/10', iconColor: 'text-primary' };

export const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    description: 'Visão geral da conta: saldo, envios recentes',
    href: '/dashboard',
    icon: LayoutDashboard,
    ...base,
  },
  {
    label: 'Enviar SMS',
    description:
      'Crie e envie mensagens para um contacto, um grupo ou uma lista importada.',
    href: '/send-sms',
    icon: Send,
    ...base,
    subItems: [
      {
        label: 'Agendados',
        description:
          'Mensagens programadas para serem enviadas numa data e hora futuras.',
        href: '/send-sms/scheduled',
        icon: CalendarClock,
      },
      {
        label: 'Rascunhos',
        description: 'Mensagens guardadas que ainda não foram enviadas.',
        href: '/send-sms/drafts',
        icon: PenLine,
      },
    ],
  },
  {
    label: 'Senders',
    description: 'Gira os nomes de remetente que aparecem aos destinatários.',
    href: '/senders',
    icon: MessageSquare,
    ...base,
  },
  {
    label: 'Histórico',
    description:
      'Consulte todos os envios feitos, com estado de entrega e detalhes.',
    href: '/history',
    icon: History,
    ...base,
  },
  {
    label: 'Contactos',
    description:
      'Organize a sua lista de contactos em grupos, importe e bloqueie números.',
    href: '/contacts',
    icon: ContactRound,
    ...base,
    subItems: [
      {
        label: 'Grupos',
        description:
          'Agrupe contactos para enviar a vários destinatários de uma só vez.',
        href: '/contacts/groups',
        icon: UsersRound,
      },
      {
        label: 'Importar',
        description: 'Carregue contactos a partir de um ficheiro CSV ou Excel.',
        href: '/contacts/import',
        icon: FileUp,
      },
      {
        label: 'Bloqueados',
        description: 'Números que não vão receber mensagens da sua conta.',
        href: '/contacts/blacklist',
        icon: Ban,
      },
    ],
  },
  {
    label: 'Modelos',
    description:
      'Crie textos reutilizáveis para enviar mensagens mais depressa.',
    href: '/sms-template',
    icon: FileText,
    ...base,
  },
  {
    label: 'Links',
    description: 'Gere os links utilizados nas suas mensagens.',
    href: '/links',
    icon: Link2,
    ...base,
  },
  {
    label: 'Pagamentos',
    description: 'Carregue saldo, veja faturas e acompanhe os pagamentos.',
    href: '/payments',
    icon: CreditCard,
    ...base,
  },
  {
    label: 'Relatórios',
    description: 'Estatísticas de envio, entrega e consumo por período.',
    href: '/reports',
    icon: BarChart3,
    ...base,
  },
  {
    label: 'Configurações',
    description: 'Dados da conta, utilizadores, segurança e preferências.',
    href: '/settings/general',
    matchPrefix: '/settings',
    icon: Settings,
    ...base,
  },
];
