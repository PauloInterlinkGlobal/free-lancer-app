import { ITemplate } from '../interfaces/templates';

export const templatesMock: ITemplate[] = [
  {
    id: 'tmpl-1',
    title: 'Promoção para provincia de Luanda',
    category: 'promocional',
    content:
      'Sr/a {{firstName}}, neste {{ano}}. Todos os cliente de {{cidade}} terao uma promoção de 50% de desconto',
    createdAt: '2026-07-09',
    variablesCount: 3,
  },
  {
    id: 'tmpl-2',
    title: 'vendas',
    category: 'promocional',
    content: '{{lastName}}{{ano}}{{cidade}}',
    createdAt: '2026-07-21',
    variablesCount: 3,
  },
  {
    id: 'tmpl-3',
    title: 'Confirmação de Envio',
    category: 'transacional',
    content:
      'Ola {{nome}}, a sua encomenda #{{codigo}} foi expedida com sucesso. Previsao de entrega: {{data}}.',
    createdAt: '2026-08-01',
    variablesCount: 3,
  },
  {
    id: 'tmpl-4',
    title: 'Lembrete de Pagamento e Fatura',
    category: 'cobranca',
    content:
      'Estimado(a) {{cliente}}, a sua fatura nº {{fatura}} no valor de {{valor}} Kz vence a {{vencimento}}.',
    createdAt: '2026-08-15',
    variablesCount: 4,
  },
  {
    id: 'tmpl-5',
    title: 'Codigo de Segurança OTP',
    category: 'notificacao',
    content:
      'O seu codigo de verificação SMSillico e {{codigoOTP}}. Valido por 5 minutos. Não partilhe com terceiros.',
    createdAt: '2026-09-02',
    variablesCount: 1,
  },
];
