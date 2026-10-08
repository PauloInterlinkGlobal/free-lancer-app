import {
  ICampaignReport,
  IDeliveryStatusItem,
  IOperatorStatItem,
  IReportStatItem,
  ITrafficVolumePoint,
} from '../interfaces/reports';

export const reportStatsMock: IReportStatItem[] = [
  {
    id: 'sms_sent',
    label: 'Total de SMS Enviados',
    value: '1.248',
    subValue: '1.180 em massa • 68 unitários',
    trend: '+18.4%',
    trendUp: true,
    type: 'sms',
    description: 'vs. período anterior',
  },
  {
    id: 'delivery_rate',
    label: 'Taxa de Entrega Global',
    value: '98.4%',
    subValue: '1.228 entregues com sucesso',
    trend: '+2.1%',
    trendUp: true,
    type: 'rate',
    description: 'Excelente estabilidade de entrega',
  },
  {
    id: 'total_cost',
    label: 'Custo Total Acumulado',
    value: '16.224,00 Kz',
    subValue: 'Média de 13,00 Kz / SMS',
    trend: '-5.2%',
    trendUp: false,
    type: 'cost',
    description: 'Economia com tarifário em lote',
  },
  {
    id: 'top_sender',
    label: 'Remetente Mais Ativo',
    value: 'SMSILLICO',
    subValue: '920 envios (73.7% do volume)',
    trend: '+12.0%',
    trendUp: true,
    type: 'sender',
    description: 'Remetente principal verificado',
  },
];

export const trafficVolumeMock: ITrafficVolumePoint[] = [
  { date: '25 Set', sent: 120, delivered: 118, failed: 2 },
  { date: '26 Set', sent: 240, delivered: 236, failed: 4 },
  { date: '27 Set', sent: 180, delivered: 178, failed: 2 },
  { date: '28 Set', sent: 310, delivered: 305, failed: 5 },
  { date: '29 Set', sent: 150, delivered: 148, failed: 2 },
  { date: '30 Set', sent: 220, delivered: 218, failed: 2 },
  { date: '01 Out', sent: 28, delivered: 25, failed: 3 },
];

export const deliveryStatusMock: IDeliveryStatusItem[] = [
  {
    name: 'Entregues',
    value: 1228,
    percentage: 98.4,
    color: '#10B981', // Emerald green
  },
  {
    name: 'Falhados',
    value: 20,
    percentage: 1.6,
    color: '#EF4444', // Red
  },
];

export const operatorStatsMock: IOperatorStatItem[] = [
  {
    name: 'Unitel',
    totalSent: 898,
    deliveryRate: 98.8,
    percentage: 72.0,
    color: '#F97316', // Orange
  },
  {
    name: 'Africell',
    totalSent: 225,
    deliveryRate: 97.6,
    percentage: 18.0,
    color: '#8B5CF6', // Purple
  },
  {
    name: 'Movicel',
    totalSent: 125,
    deliveryRate: 96.0,
    percentage: 10.0,
    color: '#3B82F6', // Blue
  },
];

export const campaignReportsMock: ICampaignReport[] = [
  {
    id: '1',
    name: 'Notificação de Faturas Outubro',
    sender: 'SMSILLICO',
    cost: 5070.0,
    currency: 'Kz',
    status: 'COMPLETED',
    createdAt: '2026-10-01T14:30:00.000Z',
    totalRecipients: 390,
    deliveredCount: 388,
    failedCount: 2,
  },
  {
    id: '2',
    name: 'Promoção Fim de Semana Exclusiva',
    sender: 'PROMO-SMS',
    cost: 4160.0,
    currency: 'Kz',
    status: 'COMPLETED',
    createdAt: '2026-09-30T10:15:00.000Z',
    totalRecipients: 320,
    deliveredCount: 315,
    failedCount: 5,
    messagePreview:
      'Aproveite 25% de desconto em todos os serviços neste fim de semana! Use o cupão SMSILLICO25.',
  },
  {
    id: '3',
    name: 'Códigos OTP de Validação 2FA',
    sender: 'ALERTA-OTP',
    cost: 884.0,
    currency: 'Kz',
    status: 'COMPLETED',
    createdAt: '2026-09-29T16:00:00.000Z',
    totalRecipients: 68,
    deliveredCount: 68,
    failedCount: 0,
    messagePreview:
      'O seu código de verificação SMS Íllico é 894021. Válido por 5 minutos.',
  },
  {
    id: '4',
    name: 'Boas-Vindas Novos Clientes',
    sender: 'JV-SERVICES',
    cost: 2340.0,
    currency: 'Kz',
    status: 'COMPLETED',
    createdAt: '2026-09-28T11:45:00.000Z',
    totalRecipients: 180,
    deliveredCount: 178,
    failedCount: 2,
    messagePreview:
      'Bem-vindo à nossa plataforma! Estamos felizes em tê-lo connosco. Dúvidas: suporte@jvservices.ao',
  },
  {
    id: '5',
    name: 'Lembrete de Agendamento Consulta',
    sender: 'SMSILLICO',
    cost: 1560.0,
    currency: 'Kz',
    status: 'COMPLETED',
    createdAt: '2026-09-27T08:30:00.000Z',
    totalRecipients: 120,
    deliveredCount: 119,
    failedCount: 1,
    messagePreview:
      'Lembramos que a sua consulta está agendada para amanhã às 10:00. Responda SIM para confirmar.',
  },
  {
    id: '6',
    name: 'Campanha de Reativação Black Friday',
    sender: 'PROMO-SMS',
    cost: 2210.0,
    currency: 'Kz',
    status: 'SCHEDULED',
    createdAt: '2026-09-26T18:00:00.000Z',
    totalRecipients: 170,
    deliveredCount: 0,
    failedCount: 0,
    messagePreview:
      'A Black Friday antecipada já começou para membros VIP! Aceda com acesso exclusivo.',
  },
];
