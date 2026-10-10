'use client';

import type { LucideIcon } from 'lucide-react';
import {
  Ban,
  BarChart3,
  CalendarClock,
  Code2,
  ContactRound,
  CreditCard,
  FileText,
  FileUp,
  History,
  LayoutDashboard,
  Link2,
  MessageSquare,
  Palette,
  PenLine,
  Send,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
  Wallet,
} from 'lucide-react';
import { usePathname } from 'next/navigation';

interface SegmentInfo {
  label: string;
  icon?: LucideIcon;
  description?: string;
  href?: string;
}

const SEGMENTS: Record<string, SegmentInfo> = {
  dashboard: {
    label: 'Dashboard',
    icon: LayoutDashboard,
    description: 'Resumo da tua atividade de SMS.',
  },
  'send-sms': {
    label: 'Enviar SMS',
    icon: Send,
    description: 'Envia uma mensagem SMS para os teus contactos.',
  },
  contactos: {
    label: 'Contactos',
    icon: ContactRound,
    description: 'Gere a tua lista de contactos.',
  },
  grupos: {
    label: 'Grupos',
    icon: UsersRound,
    description: 'Segmenta os teus contactos.',
  },

  relatorios: {
    label: 'Relatórios',
    icon: BarChart3,
    description: 'Acompanhe o desempenho e as estatísticas dos seus envios.',
  },
  senders: {
    label: 'Sender IDs',
    icon: MessageSquare,
    description:
      'Configure e gerencie a identidade que aparece no telemóvel dos destinatários ao receberem os seus SMS.',
  },
  history: {
    label: 'Histórico',
    icon: History,
    description:
      ' Consulta os SMS já enviados, filtra por data, tipo e sender.',
  },
  settings: {
    label: 'Configurações',
    icon: Settings,
    description: 'Gere as configurações da tua conta.',
    href: '/pt/settings/general',
  },

  general: {
    label: 'Geral',
    icon: SlidersHorizontal,
    description: 'Gere as informações pessoais e empresariais da tua conta.',
  },

  security: {
    label: 'Segurança',
    icon: ShieldCheck,
    description: 'Gere a segurança e as opções de proteção da tua conta.',
  },
  preferences: {
    label: 'Preferências',
    icon: Palette,
    description: 'Personalize o tema, idioma e notificações da tua conta.',
  },
  scheduled: {
    label: 'Agendados',
    icon: CalendarClock,
    description: 'Gere os envios programados para uma data futura.',
  },
  drafts: {
    label: 'Rascunhos',
    icon: PenLine,
    description: 'Continua as mensagens que ainda não enviaste.',
  },
  contacts: {
    label: 'Contactos',
    icon: ContactRound,
    description: 'Gere a tua lista de contactos.',
  },
  groups: {
    label: 'Grupos',
    icon: UsersRound,
    description: 'Segmenta os teus contactos.',
  },
  blocked: {
    label: 'Bloqueados',
    icon: Ban,
    description: 'Contactos que não recebem as tuas mensagens.',
  },
  payments: {
    label: 'Pagamentos',
    icon: CreditCard,
    description: 'Carrega a tua conta e acompanha os teus pagamentos.',
  },
  'top-up': {
    label: 'Carregar conta',
    icon: Wallet,
    description: 'Escolhe o valor e o método de pagamento.',
  },
  'sms-template': {
    label: 'Modelos',
    icon: FileText,
    description: 'Gere os teus modelos de mensagem.',
  },
  links: {
    label: 'Links',
    icon: Link2,
    description: 'Gere os links que usa nas suas mensagens.',
  },
  reports: {
    label: 'Relatórios',
    icon: BarChart3,
    description: 'Acompanhe o desempenho e as estatísticas dos seus envios.',
  },
  'api-integration': {
    label: 'API & Implementação',
    icon: Code2,
    description:
      'Gere as chaves de API e integra o envio de SMS na tua aplicação.',
  },
  import: {
    label: 'Importar contactos',
    icon: FileUp,
    description:
      'Carregue a sua lista de contactos para iniciar o envio de mensagens.',
  },
};

export interface BreadcrumbItem {
  label: string;
  icon?: LucideIcon;
  href?: string;
}

export function usePathBreadcrumb() {
  const pathname = usePathname();

  const segments = pathname.split('/').filter(Boolean);

  const crumbs = segments
    .map((segment, index) => ({
      segment,
      info: SEGMENTS[segment],
      path: '/' + segments.slice(0, index + 1).join('/'),
    }))
    .filter((c) => c.info);

  const last = crumbs[crumbs.length - 1];
  const isDashboard = last?.segment === 'dashboard';

  const trail: BreadcrumbItem[] = crumbs.map((c, index) => ({
    label: c.info.label,
    icon: c.info.icon,
    href: index === crumbs.length - 1 ? undefined : (c.info.href ?? c.path),
  }));

  const items: BreadcrumbItem[] = isDashboard
    ? []
    : [
        {
          label: SEGMENTS.dashboard.label,
          icon: SEGMENTS.dashboard.icon,
          href: '/dashboard',
        },
        ...trail,
      ];

  return {
    items,
    title: last?.info.label ?? '',
    description: last?.info.description ?? '',
  };
}
