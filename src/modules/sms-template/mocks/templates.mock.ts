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
  {
    id: 'tmpl-6',
    title: 'Boas-vindas a Novos Clientes',
    category: 'notificacao',
    content:
      'Bem-vindo(a) {{nome}} a SMSillico! A sua conta foi criada com sucesso.',
    createdAt: '2026-09-10',
    variablesCount: 1,
  },
  {
    id: 'tmpl-7',
    title: 'Promoção Black Friday',
    category: 'promocional',
    content:
      '{{nome}}, a Black Friday chegou! {{desconto}}% de desconto ate {{data}}.',
    createdAt: '2026-09-18',
    variablesCount: 3,
  },
  {
    id: 'tmpl-8',
    title: 'Aviso de Fatura em Atraso',
    category: 'cobranca',
    content:
      'Sr/a {{cliente}}, a fatura nº {{fatura}} encontra-se em atraso ha {{dias}} dias.',
    createdAt: '2026-09-25',
    variablesCount: 3,
  },
  {
    id: 'tmpl-9',
    title: 'Confirmação de Pagamento',
    category: 'transacional',
    content: 'Recebemos o seu pagamento de {{valor}} Kz. Obrigado, {{nome}}!',
    createdAt: '2026-10-01',
    variablesCount: 2,
  },
  {
    id: 'tmpl-10',
    title: 'Lembrete de Consulta',
    category: 'notificacao',
    content: 'Ola {{nome}}, lembramos a sua consulta a {{data}} as {{hora}}.',
    createdAt: '2026-10-03',
    variablesCount: 3,
  },
  {
    id: 'tmpl-11',
    title: 'SMS em massa de Natal',
    category: 'promocional',
    content:
      'Feliz Natal {{nome}}! Aproveite {{desconto}}% em todas as lojas de {{cidade}}.',
    createdAt: '2026-10-04',
    variablesCount: 3,
  },
  {
    id: 'tmpl-12',
    title: 'Recuperação de Palavra-passe',
    category: 'transacional',
    content: 'O seu codigo de recuperação e {{codigo}}. Expira em 10 minutos.',
    createdAt: '2026-10-05',
    variablesCount: 1,
  },
  {
    id: 'tmpl-13',
    title: 'Pesquisa de Satisfação',
    category: 'notificacao',
    content: '{{nome}}, como foi o nosso atendimento? Responda em {{link}}.',
    createdAt: '2026-10-06',
    variablesCount: 2,
  },
];
