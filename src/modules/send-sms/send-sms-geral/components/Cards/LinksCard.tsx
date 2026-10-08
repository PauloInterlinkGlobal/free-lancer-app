'use client';

import {
  Check,
  CreditCard,
  Globe,
  Link2,
  MapPin,
  MessageCircle,
  Plus,
  Tag,
  X,
} from 'lucide-react';
import { useState } from 'react';
import { useToastStore } from '@/core/store';

export interface ISmsLink {
  id: string;
  title: string;
  url: string;
  shortUrl?: string;
  category: 'web' | 'whatsapp' | 'payment' | 'promo' | 'location' | 'custom';
}

const DEFAULT_LINKS: ISmsLink[] = [
  {
    id: 'l1',
    title: 'Website Oficial',
    url: 'https://smsillico.ao',
    shortUrl: 'https://smsi.ao/site',
    category: 'web',
  },
  {
    id: 'l2',
    title: 'WhatsApp Suporte',
    url: 'https://wa.me/244923000000',
    shortUrl: 'https://smsi.ao/zap',
    category: 'whatsapp',
  },
  {
    id: 'l3',
    title: 'Link de Pagamento',
    url: 'https://smsillico.ao/pagamentos',
    shortUrl: 'https://smsi.ao/pagar',
    category: 'payment',
  },
  {
    id: 'l4',
    title: 'Campanha Promocional',
    url: 'https://smsillico.ao/campanhas/desconto',
    shortUrl: 'https://smsi.ao/promo',
    category: 'promo',
  },
  {
    id: 'l5',
    title: 'Localização da Loja',
    url: 'https://maps.google.com/?q=Luanda',
    shortUrl: 'https://smsi.ao/loja',
    category: 'location',
  },
];

interface LinksCardProps {
  onInsertLink: (url: string) => void;
}

export function LinksCard({ onInsertLink }: LinksCardProps) {
  const { success } = useToastStore();
  const [links, setLinks] = useState<ISmsLink[]>(DEFAULT_LINKS);
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customTitle, setCustomTitle] = useState('');
  const [customUrl, setCustomUrl] = useState('');
  const [shorten, setShorten] = useState(true);
  const [lastInsertedId, setLastInsertedId] = useState<string | null>(null);

  const getIcon = (category: ISmsLink['category']) => {
    switch (category) {
      case 'web':
        return Globe;
      case 'whatsapp':
        return MessageCircle;
      case 'payment':
        return CreditCard;
      case 'promo':
        return Tag;
      case 'location':
        return MapPin;
      default:
        return Link2;
    }
  };

  const handleSelectLink = (link: ISmsLink) => {
    const targetUrl = link.shortUrl || link.url;
    onInsertLink(targetUrl);
    setLastInsertedId(link.id);
    success(`Link "${link.title}" inserido na mensagem!`);
    setTimeout(() => {
      setLastInsertedId(null);
    }, 1800);
  };

  const handleAddCustomLink = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!customUrl.trim()) return;

    let formattedUrl = customUrl.trim();
    if (
      !formattedUrl.startsWith('http://') &&
      !formattedUrl.startsWith('https://')
    ) {
      formattedUrl = `https://${formattedUrl}`;
    }

    const title = customTitle.trim() || 'Link Personalizado';
    const slug = Math.random().toString(36).substring(2, 7);
    const shortUrl = shorten ? `https://smsi.ao/${slug}` : formattedUrl;

    const newLink: ISmsLink = {
      id: `custom-${Date.now()}`,
      title,
      url: formattedUrl,
      shortUrl,
      category: 'custom',
    };

    setLinks((prev) => [newLink, ...prev]);
    onInsertLink(shortUrl);
    success(`Link "${title}" inserido na mensagem!`);

    setCustomTitle('');
    setCustomUrl('');
    setShowCustomForm(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center justify-between gap-3">
        <span className="text-sm font-medium text-primary-content">
          Inserir links na mensagem
        </span>

        <button
          type="button"
          onClick={() => setShowCustomForm((prev) => !prev)}
          className="inline-flex items-center gap-1 rounded-lg border border-border-ui bg-surface px-2.5 py-1 text-xs font-semibold text-primary transition-colors hover:bg-item-hover active:scale-95"
        >
          {showCustomForm ? (
            <>
              <X size={13} aria-hidden /> Fechar
            </>
          ) : (
            <>
              <Plus size={13} aria-hidden /> Novo Link
            </>
          )}
        </button>
      </div>

      {showCustomForm && (
        <div className="flex flex-col gap-3 rounded-xl border border-primary/30 bg-primary/5 p-3.5 transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-primary">
              Personalizar e encurtar URL
            </span>
            <span className="text-[11px] text-muted-content">
              Encurtar poupa caracteres no SMS
            </span>
          </div>

          <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            <input
              type="text"
              placeholder="Nome do link (ex: Nova Promoção)"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomLink();
                }
              }}
              className="rounded-lg border border-border-ui bg-surface px-3 py-1.5 text-xs text-primary-content placeholder:text-muted-content focus:border-primary focus:outline-none"
            />
            <input
              type="text"
              placeholder="URL de destino (ex: meusite.ao/produto)"
              value={customUrl}
              onChange={(e) => setCustomUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddCustomLink();
                }
              }}
              className="rounded-lg border border-border-ui bg-surface px-3 py-1.5 text-xs text-primary-content placeholder:text-muted-content focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <label className="flex cursor-pointer items-center gap-2 text-xs text-muted-content select-none">
              <input
                type="checkbox"
                checked={shorten}
                onChange={(e) => setShorten(e.target.checked)}
                className="h-3.5 w-3.5 rounded border-border-ui text-primary focus:ring-primary"
              />
              Encurtar automaticamente com domínio seguro (smsi.ao)
            </label>

            <button
              type="button"
              onClick={() => handleAddCustomLink()}
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-white shadow-sm transition-opacity hover:opacity-90 active:scale-95"
            >
              <Plus size={13} aria-hidden /> Inserir na Mensagem
            </button>
          </div>
        </div>
      )}

      {/* Grid de links disponíveis */}
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3">
        {links.map((link) => {
          const Icon = getIcon(link.category);
          const isRecentlyInserted = lastInsertedId === link.id;
          const displayUrl = link.shortUrl || link.url;

          return (
            <button
              key={link.id}
              type="button"
              onClick={() => handleSelectLink(link)}
              title={`Clique para inserir "${displayUrl}" na mensagem`}
              className={`group flex items-center justify-between gap-2.5 rounded-xl border p-2.5 text-left transition-all ${
                isRecentlyInserted
                  ? 'border-emerald-500 bg-emerald-500/10 shadow-sm'
                  : 'border-border-ui bg-surface hover:border-primary/50 hover:bg-item-hover'
              }`}
            >
              <div className="flex min-w-0 items-center gap-2.5">
                <span
                  className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-colors ${
                    isRecentlyInserted
                      ? 'bg-emerald-500 text-white'
                      : 'bg-surface-raised text-primary group-hover:bg-primary group-hover:text-white'
                  }`}
                >
                  {isRecentlyInserted ? (
                    <Check size={15} aria-hidden />
                  ) : (
                    <Icon size={15} aria-hidden />
                  )}
                </span>

                <div className="min-w-0 flex-1">
                  <span className="block truncate text-xs font-semibold text-primary-content">
                    {link.title}
                  </span>
                  <span className="block truncate text-[11px] font-mono text-muted-content">
                    {displayUrl}
                  </span>
                </div>
              </div>

              <span
                className={`inline-flex shrink-0 items-center rounded-md px-1.5 py-0.5 text-[10px] font-semibold transition-colors ${
                  isRecentlyInserted
                    ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
                    : 'bg-surface-raised text-muted-content group-hover:bg-primary/10 group-hover:text-primary'
                }`}
              >
                {isRecentlyInserted ? 'Inserido' : '+ Inserir'}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default LinksCard;
