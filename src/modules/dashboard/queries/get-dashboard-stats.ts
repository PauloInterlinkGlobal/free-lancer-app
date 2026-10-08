import { IDashboardStats } from '../interfaces/dashboard';

export async function getDashboardStats(): Promise<IDashboardStats> {
  return {
    stats: [
      {
        label: 'SMS em Massa ativas',
        value: '24',
        trend: '+3 este mês',
        trendUp: true,
        iconType: 'campaigns',
      },
      {
        label: 'SMS enviados',
        value: '12.430',
        trend: '+8% este mês',
        trendUp: true,
        iconType: 'messages',
      },
      {
        label: 'Utilizadores',
        value: '318',
        trend: '+12 este mês',
        trendUp: true,
        iconType: 'users',
      },
      {
        label: 'Taxa de entrega',
        value: '98.2%',
        trend: '-0.3% este mês',
        trendUp: false,
        iconType: 'deliveryRate',
      },
    ],
    chartData: [
      { month: 'Abr', enviados: 3200, entregues: 3100 },
      { month: 'Mai', enviados: 4100, entregues: 4000 },
      { month: 'Jun', enviados: 3800, entregues: 3700 },
      { month: 'Jul', enviados: 5200, entregues: 5100 },
      { month: 'Ago', enviados: 4800, entregues: 4700 },
      { month: 'Set', enviados: 6100, entregues: 6000 },
    ],
    recentCampaigns: [
      {
        id: '1',
        name: 'Promoção Setembro',
        status: 'active',
        sent: 1200,
        delivered: 1180,
        date: '25 Set 2026',
      },
      {
        id: '2',
        name: 'Newsletter Agosto',
        status: 'completed',
        sent: 3400,
        delivered: 3350,
        date: '31 Ago 2026',
      },
      {
        id: '3',
        name: 'Alerta de Serviço',
        status: 'paused',
        sent: 800,
        delivered: 780,
        date: '20 Ago 2026',
      },
      {
        id: '4',
        name: 'Campanha Black Friday',
        status: 'active',
        sent: 2100,
        delivered: 2050,
        date: '15 Ago 2026',
      },
    ],
  };
}
