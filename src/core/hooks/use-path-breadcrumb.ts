'use client';

import { usePathname } from 'next/navigation';

interface SegmentInfo {
  label: string;
  description?: string;
  href?: string;
}

const SEGMENTS: Record<string, SegmentInfo> = {
  dashboard: {
    label: 'Dashboard',
    description: 'Resumo da tua atividade de SMS.',
  },
  'send-sms': {
    label: 'Enviar SMS',
    description: 'Envia uma mensagem SMS para os teus contactos.',
  },
  contactos: {
    label: 'Contactos',
    description: 'Gere a tua lista de contactos.',
  },
  grupos: {
    label: 'Grupos',
    description: 'Segmenta os teus contactos.',
  },

  relatorios: {
    label: 'Relatórios',
    description: 'Acompanhe o desempenho e as estatísticas dos seus envios.',
  },
  senders: {
    label: 'Sender IDs',
    description:
      'Configure e gerencie a identidade que aparece no telemóvel dos destinatários ao receberem os seus SMS.',
  },
  history: {
    label: 'Histórico',
    description:
      ' Consulta os SMS já enviados, filtra por data, tipo e sender.',
  },
  settings: {
    label: 'Configurações',
    description: 'Gere as configurações da tua conta.',
    href: '/pt/settings/general',
  },

  general: {
    label: 'Geral',
    description: 'Gere as informações pessoais e empresariais da tua conta.',
  },

  security: {
    label: 'Segurança',
    description: 'Gere a segurança e as opções de proteção da tua conta.',
  },
  preferences: {
    label: 'Preferências',
    description: 'Personalize o tema, idioma e notificações da tua conta.',
  },
  scheduled: {
    label: 'Agendados',
    description: 'Gere os envios programados para uma data futura.',
  },
  drafts: {
    label: 'Rascunhos',
    description: 'Continua as mensagens que ainda não enviaste.',
  },
  contacts: {
    label: 'Contactos',
    description: 'Gere a tua lista de contactos.',
  },
  groups: {
    label: 'Grupos',
    description: 'Segmenta os teus contactos.',
  },
  blocked: {
    label: 'Bloqueados',
    description: 'Contactos que não recebem as tuas mensagens.',
  },
  payments: {
    label: 'Pagamentos',
    description: 'Carrega a tua conta e acompanha os teus pagamentos.',
  },
  'top-up': {
    label: 'Carregar conta',
    description: 'Escolhe o valor e o método de pagamento.',
  },
  'sms-template': {
    label: 'Modelos',
    description: 'Gere os teus modelos de mensagem.',
  },
  reports: {
    label: 'Relatórios',
    description: 'Acompanhe o desempenho e as estatísticas dos seus envios.',
  },
  import: {
    label: 'Importar contactos',
    description:
      'Carregue a sua lista de contactos para iniciar o envio de mensagens.',
  },
};

export interface BreadcrumbItem {
  label: string;
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
    href: index === crumbs.length - 1 ? undefined : (c.info.href ?? c.path),
  }));

  const items: BreadcrumbItem[] = isDashboard
    ? []
    : [{ label: SEGMENTS.dashboard.label, href: '/dashboard' }, ...trail];

  return {
    items,
    title: last?.info.label ?? '',
    description: last?.info.description ?? '',
  };
}
