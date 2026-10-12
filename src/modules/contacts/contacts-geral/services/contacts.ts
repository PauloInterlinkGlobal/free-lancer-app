import type { IContactDetails } from '../contact-details/interfaces/contact-details';

const PAGE_SIZE = 10;

export async function getContactDetails(
  id: string,
  page = 1
): Promise<IContactDetails | null> {
  // TODO: trocar por chamada real, por exemplo:
  // const res = await fetch(`${API_URL}/contacts/${id}/details?page=${page}`);
  // if (!res.ok) return null;
  // return res.json();

  const all = Array.from({ length: 23 }, (_, i) => ({
    id: String(i + 1),
    sentAt: new Date(2026, 9, 10 - i, 9 + (i % 8), 15).toISOString(),
    message: `Mensagem de exemplo número ${i + 1} enviada ao contacto.`,
    origin: (['campaign', 'quick', 'api'] as const)[i % 3],
    groups:
      i % 4 === 0 ? [] : ['Clientes', 'VIP', 'Luanda'].slice(0, (i % 3) + 1),
    status: (['delivered', 'delivered', 'sent', 'pending', 'failed'] as const)[
      i % 5
    ],
  }));

  const delivered = all.filter((m) => m.status === 'delivered').length;
  const start = (page - 1) * PAGE_SIZE;

  return {
    contact: {
      id,
      name: 'Contacto de exemplo',
      number: '+244 923 000 000',
    } as IContactDetails['contact'],
    stats: {
      totalSent: all.length,
      conversionRate: (delivered / all.length) * 100,
      lastMessageAt: all[0].sentAt,
    },
    messages: all.slice(start, start + PAGE_SIZE),
    totalPages: Math.ceil(all.length / PAGE_SIZE),
  };
}
