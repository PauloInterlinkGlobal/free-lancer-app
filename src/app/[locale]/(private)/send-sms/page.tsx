import { getApprovedLinks } from '@/modules/links/services/links.service';
import { SendsmsList } from '@/modules/send-sms/send-sms-geral/SendsmsList';

// Sem pré-renderização estática: a lista de links aprovados muda ao criar ou eliminar um link.
export const dynamic = 'force-dynamic';

export default async function SendSmsPage() {
  // Só os campos necessários para inserir o link na mensagem.
  const approved = await getApprovedLinks();
  const links = approved.map(({ id, description, url }) => ({ id, description, url }));

  return <SendsmsList links={links} />;
}
