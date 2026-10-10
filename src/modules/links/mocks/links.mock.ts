import { ILink } from '../interfaces/links';

// TODO(api): Substituir por chamada ao serviço de links quando a API estiver disponível.
export const linksMock: ILink[] = [
  {
    id: 'link-1',
    description: 'Website Oficial SMSillico',
    url: 'https://smsillico.ao',
    submittedAt: '2026-09-15T09:30:00Z',
    reviewedAt: '2026-09-15T11:45:00Z',
    status: 'approved',
  },
  {
    id: 'link-2',
    description: 'Canal de Atendimento WhatsApp',
    url: 'https://wa.me/244923000111',
    submittedAt: '2026-09-18T14:20:00Z',
    reviewedAt: '2026-09-18T16:10:00Z',
    status: 'approved',
  },
  {
    id: 'link-3',
    description: 'Portal de Pagamento e Faturas Multicaixa',
    url: 'https://pagamentos.smsillico.ao/fatura',
    submittedAt: '2026-09-22T08:15:00Z',
    reviewedAt: '2026-09-22T10:00:00Z',
    status: 'approved',
  },
  {
    id: 'link-4',
    description: 'Campanha Black Friday Angola',
    url: 'https://promo.smsillico.ao/black-friday',
    submittedAt: '2026-10-01T11:00:00Z',
    reviewedAt: '2026-10-01T15:30:00Z',
    status: 'approved',
  },
  {
    id: 'link-5',
    description: 'Download da Aplicação Mobile',
    url: 'https://app.smsillico.ao/download',
    submittedAt: '2026-10-03T16:40:00Z',
    reviewedAt: null,
    status: 'pending',
  },
  {
    id: 'link-6',
    description: 'Registo de Novo Parceiro Comercial',
    url: 'https://parceiros.smsillico.ao/adesao',
    submittedAt: '2026-10-05T10:10:00Z',
    reviewedAt: null,
    status: 'pending',
  },
  {
    id: 'link-7',
    description: 'Localização da Agência Luanda - Maculusso',
    url: 'https://maps.google.com/?q=Luanda+Maculusso',
    submittedAt: '2026-10-06T13:25:00Z',
    reviewedAt: null,
    status: 'pending',
  },
  {
    id: 'link-8',
    description: 'Link com Encurtador Desconhecido',
    url: 'https://bit.ly/3xY8abc-promo',
    submittedAt: '2026-09-28T09:00:00Z',
    reviewedAt: '2026-09-29T14:00:00Z',
    status: 'rejected',
    rejectionReason:
      'Encurtadores genéricos de terceiros não são permitidos pelas operadoras. Utilize domínio próprio.',
  },
  {
    id: 'link-9',
    description: 'Página de Sorteio Não Regulamentado',
    url: 'https://sorteio-premios-rapidos.xyz',
    submittedAt: '2026-09-30T17:50:00Z',
    reviewedAt: '2026-10-01T09:20:00Z',
    status: 'rejected',
    rejectionReason:
      'Destino não cumpre as diretrizes de conformidade contra spam e phishing.',
  },
];
