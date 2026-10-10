'use client';

import { Input } from '@/core/components/Input';
import { useToastStore } from '@/core/store/toast.store';
import { webhookEvents } from '@/modules/api-integration/constants/api-integration';
import { IWebhook } from '@/modules/api-integration/interfaces/api-integration';
import { formatApiDate } from '@/modules/api-integration/utils/api-integration-format';
import { Plus, Trash2 } from 'lucide-react';
import { useState } from 'react';

interface ApiWebhooksProps {
  data: IWebhook[];
}

const eventLabel = (value: string) =>
  webhookEvents.find((e) => e.value === value)?.label ?? value;

export function ApiWebhooks({ data }: ApiWebhooksProps) {
  const { success } = useToastStore();
  const [webhooks, setWebhooks] = useState(data);
  const [url, setUrl] = useState('');
  const [events, setEvents] = useState<string[]>([webhookEvents[0].value]);
  const [error, setError] = useState('');

  const toggleEvent = (value: string) =>
    setEvents((prev) =>
      prev.includes(value) ? prev.filter((e) => e !== value) : [...prev, value]
    );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    let valid = false;
    try {
      valid = new URL(url.trim()).protocol === 'https:';
    } catch {
      valid = false;
    }
    if (!valid) {
      setError('Indique um URL válido que comece por https://');
      return;
    }
    if (events.length === 0) {
      setError('Selecione pelo menos um evento.');
      return;
    }

    // TODO: substituir pela chamada à API
    setWebhooks((prev) => [
      {
        id: crypto.randomUUID(),
        url: url.trim(),
        events,
        active: true,
        createdAt: new Date().toISOString(),
      },
      ...prev,
    ]);
    setUrl('');
    setError('');
    success('Webhook adicionado');
  };

  const toggleActive = (id: string) =>
    setWebhooks((prev) =>
      prev.map((w) => (w.id === id ? { ...w, active: !w.active } : w))
    );

  const remove = (id: string) => {
    setWebhooks((prev) => prev.filter((w) => w.id !== id));
    success('Webhook removido');
  };

  return (
    <section className="flex flex-col gap-4 rounded-2xl bg-surface p-5 shadow-sm">
      <div>
        <h2 className="text-base font-semibold text-primary-content">
          Webhooks
        </h2>
        <p className="text-sm text-muted-content">
          Receba notificações no seu servidor quando ocorrerem eventos.
        </p>
      </div>

      <form onSubmit={handleAdd} className="flex flex-col gap-3">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
          <div className="min-w-0 flex-1">
            <Input
              label="URL de destino"
              placeholder="https://exemplo.com/webhook"
              value={url}
              onChange={(e) => {
                setUrl(e.target.value);
                if (error) setError('');
              }}
              error={error}
            />
          </div>
          <button
            type="submit"
            className="flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 sm:mt-[26px]"
          >
            <Plus size={16} aria-hidden />
            Adicionar
          </button>
        </div>

        <div className="flex flex-wrap gap-3">
          {webhookEvents.map((ev) => (
            <label
              key={ev.value}
              className="flex items-center gap-2 text-sm text-secondary-content"
            >
              <input
                type="checkbox"
                checked={events.includes(ev.value)}
                onChange={() => toggleEvent(ev.value)}
                className="accent-primary"
              />
              {ev.label}
            </label>
          ))}
        </div>
      </form>

      <ul className="flex flex-col divide-y divide-border-ui">
        {webhooks.length === 0 && (
          <li className="py-6 text-center text-sm text-muted-content">
            Nenhum webhook configurado.
          </li>
        )}
        {webhooks.map((w) => (
          <li
            key={w.id}
            className="flex flex-wrap items-center justify-between gap-3 py-3"
          >
            <div className="min-w-0">
              <p className="break-all font-mono text-sm text-primary-content">
                {w.url}
              </p>
              <p className="text-xs text-muted-content">
                {w.events.map(eventLabel).join(' · ')} · Criado em{' '}
                {formatApiDate(w.createdAt)}
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                role="switch"
                aria-checked={w.active}
                aria-label={w.active ? 'Desativar webhook' : 'Ativar webhook'}
                onClick={() => toggleActive(w.id)}
                className={`relative h-5 w-9 rounded-full transition-colors ${
                  w.active ? 'bg-primary' : 'bg-neutral-300 dark:bg-neutral-700'
                }`}
              >
                <span
                  className={`absolute top-0.5 h-4 w-4 rounded-full bg-white transition-all ${
                    w.active ? 'left-[18px]' : 'left-0.5'
                  }`}
                />
              </button>
              <button
                type="button"
                onClick={() => remove(w.id)}
                aria-label="Remover webhook"
                className="flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-red-500/10 hover:text-red-500"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
