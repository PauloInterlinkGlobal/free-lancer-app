'use client';

import { SelectPopup } from '@/core/components/Select';
import { useModalStore } from '@/core/store/useModalStore';
import type { IContact } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import { contactsMock } from '@/modules/contacts/contacts-geral/mocks/contacts.mock';
import { collectCustomVariableKeys } from '@/modules/contacts/contacts-geral/utils/collectCustomVariableKeys';
import { SelectContactsModal } from '@/modules/send-sms/send-sms-geral/components/Modal/AddContactsModal';
import { MessageEditor } from '@/modules/send-sms/send-sms-geral/components/SmsForm/MessageEditor';
import {
  fillVariables,
  getSmsInfo,
  formatSms,
} from '@/modules/send-sms/send-sms-geral/sms-utils';
import { MessageSquare, Send, UserPlus, X, Zap } from 'lucide-react';
import { Link } from '@/core/i18n/navigation';
import type { ILink } from '@/modules/links/interfaces/links';
import { useEffect, useMemo, useState } from 'react';
import type {
  IContactGroup,
  ISendSmsPayload,
  ISenderId,
  ISmsTemplate,
  SmsType,
} from '../../interfaces';
import { GroupsCard } from '../Cards/GroupsCard';
import { LinksCard } from '../Cards/LinksCard';
import { TemplatesCard } from '../Cards/TemplatesCard';
import { PhonePreview } from '../PhonePreview';
import { SectionCard } from '../SectionCard';
import { SmsSchedule } from '../SmsSchedule';

// TODO(api): as chaves personalizadas devem vir da lista de contactos da conta.
// Mesma lista para o editor, a pré-visualização e o SMS de teste.
const SMS_CUSTOM_KEYS = collectCustomVariableKeys(contactsMock);

interface SmsFormProps {
  senderIds: ISenderId[];
  groups: IContactGroup[];
  templates: ISmsTemplate[];
  availableContacts: IContact[];
  links?: Pick<ILink, 'id' | 'description' | 'url'>[];
  loading?: boolean;
  balance?: number;
  onSendTest?: (message: string) => void | Promise<void>;
  onSubmit: (payload: ISendSmsPayload) => void | Promise<void>;
}

const SMS_TYPES = [
  {
    value: 'normal',
    label: 'SMS normal',
    description: 'Fica guardada na caixa de entrada do destinatário.',
    icon: MessageSquare,
  },
  {
    value: 'flash',
    label: 'SMS flash',
    description: 'Aparece direto no ecrã e não fica guardada.',
    icon: Zap,
  },
] as const;

const MAX_VISIBLE_CONTACTS = 6;
const labelClass = 'text-sm font-medium text-primary-content';

export function SmsForm({
  senderIds,
  groups,
  templates,
  links,
  loading,
  balance,
  onSendTest,
  onSubmit,
  availableContacts,
}: SmsFormProps) {
  const [type, setType] = useState<SmsType>('normal');
  const [senderId, setSenderId] = useState('');
  const [groupIds, setGroupIds] = useState<string[]>([]);
  const [contacts, setContacts] = useState<string[]>([]);
  const [message, setMessage] = useState('');
  const [scheduled, setScheduled] = useState(false);
  const [scheduledDate, setScheduledDate] = useState('');
  const [scheduledTime, setScheduledTime] = useState('');
  const [testing, setTesting] = useState(false);
  const [time, setTime] = useState('');
  const { openModal, closeModal } = useModalStore();

  useEffect(() => {
    setTime(
      new Date().toLocaleTimeString('pt-PT', {
        hour: '2-digit',
        minute: '2-digit',
      })
    );
  }, []);

  const senderName = senderIds.find((s) => s.id === senderId)?.name;
  const info = useMemo(() => getSmsInfo(message), [message]);
  const previewMessage = useMemo(
    () => fillVariables(message, SMS_CUSTOM_KEYS),
    [message]
  );

  const totalRecipients =
    groups
      .filter((g) => groupIds.includes(g.id))
      .reduce((sum, g) => sum + g.total, 0) + contacts.length;

  const visibleContacts = contacts.slice(0, MAX_VISIBLE_CONTACTS);
  const hiddenContactsCount = contacts.length - MAX_VISIBLE_CONTACTS;

  const totalSms = info.segments * totalRecipients;
  const balanceAfter =
    typeof balance === 'number' ? balance - totalSms : undefined;
  const insufficientBalance = balanceAfter !== undefined && balanceAfter < 0;

  const canSend =
    !!senderId &&
    !!message.trim() &&
    (groupIds.length > 0 || contacts.length > 0) &&
    !insufficientBalance &&
    !loading;

  function removeContact(contact: string) {
    setContacts((prev) => prev.filter((c) => c !== contact));
  }

  function handleConfirmContacts(numbers: string[]) {
    setContacts(numbers);
    closeModal();
  }

  function handleInsertLink(url: string) {
    setMessage((prev) => {
      const trimmed = prev.trim();
      return trimmed ? `${trimmed} ${url}` : url;
    });
  }

  async function handleSendTest() {
    if (!onSendTest) return;
    setTesting(true);
    try {
      await onSendTest(fillVariables(message.trim(), SMS_CUSTOM_KEYS));
    } finally {
      setTesting(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSend) return;
    await onSubmit({
      type,
      senderId,
      groupIds,
      contacts,
      message: message.trim(),
    });
  }

  const stats = [
    { label: 'Destinatários', value: totalRecipients },
    { label: 'SMS por contacto', value: info.segments },
    { label: 'Total de SMS', value: totalSms },
  ];

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_340px]"
    >
      <div className="flex min-w-0 flex-col gap-6">
        {/* 1. Remetente e tipo */}
        <SectionCard
          step={1}
          title="Remetente e tipo"
          description="Quem envia e como a mensagem chega ao destinatário."
        >
          <div
            role="radiogroup"
            aria-label="Tipo de mensagem"
            className="grid grid-cols-1 gap-3 sm:grid-cols-2"
          >
            {SMS_TYPES.map(({ value, label, description, icon: Icon }) => {
              const active = type === value;
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={active}
                  onClick={() => setType(value)}
                  className={`flex items-start gap-3 rounded-xl border p-4 text-left transition-all ${
                    active
                      ? 'border-primary bg-primary/10 shadow-sm'
                      : 'border-border-ui bg-surface hover:border-primary/40 hover:bg-item-hover'
                  }`}
                >
                  <span
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                      active
                        ? 'bg-primary text-white'
                        : 'bg-surface-raised text-muted-content'
                    }`}
                  >
                    <Icon size={18} aria-hidden />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-sm font-semibold text-primary-content">
                      {label}
                    </span>
                    <span className="mt-0.5 block text-xs text-muted-content">
                      {description}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>

          <SelectPopup
            label="Sender ID"
            value={senderId}
            onChange={(value) => setSenderId(String(value))}
            placeholder="Selecione um Sender ID"
            options={senderIds.map((sender) => ({
              value: sender.id,
              label: sender.name,
            }))}
          />
        </SectionCard>

        {/* 2. Destinatários */}
        <SectionCard
          step={2}
          title="Destinatários"
          description="Escolha grupos inteiros ou adicione números avulsos."
          aside={
            <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
              {totalRecipients} destinatário{totalRecipients === 1 ? '' : 's'}
            </span>
          }
        >
          <GroupsCard
            groups={groups}
            selectedIds={groupIds}
            onChange={setGroupIds}
          />

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className={labelClass}>Números avulsos</span>
              {contacts.length > 0 && (
                <span className="text-xs text-muted-content">
                  {contacts.length} número{contacts.length === 1 ? '' : 's'}{' '}
                  adicionado{contacts.length === 1 ? '' : 's'}
                </span>
              )}
            </div>

            <div className="flex min-h-[56px] flex-wrap items-center gap-2 rounded-xl border border-dashed border-border-ui bg-surface-raised/40 p-3">
              {contacts.length === 0 && (
                <span className="text-xs text-muted-content">
                  Nenhum contacto adicionado
                </span>
              )}

              {visibleContacts.map((contact) => (
                <span
                  key={contact}
                  className="inline-flex items-center gap-1.5 rounded-full bg-surface py-1 pl-3 pr-2 text-xs font-medium text-primary-content shadow-sm ring-1 ring-border-ui"
                >
                  {contact}
                  <button
                    type="button"
                    aria-label={`Remover ${contact}`}
                    onClick={() => removeContact(contact)}
                    className="flex h-4 w-4 items-center justify-center rounded-full text-muted-content transition-colors hover:bg-surface-subtle hover:text-primary-content"
                  >
                    <X size={11} aria-hidden />
                  </button>
                </span>
              ))}

              {hiddenContactsCount > 0 && (
                <button
                  type="button"
                  onClick={() => openModal('SELECT_CONTACT_SMS')}
                  title={`Mais ${hiddenContactsCount} contacto${hiddenContactsCount === 1 ? '' : 's'}. Clique para gerir todos.`}
                  className="inline-flex items-center justify-center rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary ring-1 ring-primary/20 shadow-sm transition-all hover:bg-primary/20 active:scale-95 cursor-pointer"
                >
                  +{hiddenContactsCount}
                </button>
              )}

              <button
                type="button"
                onClick={() => openModal('SELECT_CONTACT_SMS')}
                className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3 py-1 text-xs font-medium text-white shadow-sm transition-all hover:bg-primary/90 hover:shadow active:scale-95 cursor-pointer"
              >
                <UserPlus size={13} aria-hidden />
                Adicionar
              </button>
            </div>
          </div>
        </SectionCard>

        {/* 3. Mensagem */}
        <SectionCard
          step={3}
          title="Mensagem"
          description="Escreva o texto ou parta de um modelo."
        >
          <TemplatesCard
            templates={templates}
            currentMessage={message}
            onSelect={setMessage}
          />

          <LinksCard links={links} onInsertLink={handleInsertLink} />

          <MessageEditor
            value={message}
            onChange={setMessage}
            onSendTest={onSendTest ? handleSendTest : undefined}
            testing={testing}
            customKeys={SMS_CUSTOM_KEYS}
          />
        </SectionCard>

        {/* 4. Envio */}
        <SectionCard
          step={4}
          title="Revisão e envio"
          description="Confirme os números e escolha quando enviar."
        >
          <SmsSchedule
            scheduled={scheduled}
            onScheduledChange={setScheduled}
            date={scheduledDate}
            onDateChange={setScheduledDate}
            time={scheduledTime}
            onTimeChange={setScheduledTime}
          />

          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="rounded-xl bg-surface-raised px-3 py-2.5"
              >
                <dt className="text-[11px] text-muted-content">{s.label}</dt>
                <dd
                  className={`mt-0.5 truncate text-base font-bold ${
                    'accent' in s && s.accent
                      ? 'text-primary'
                      : 'text-primary-content'
                  }`}
                >
                  {s.value}
                </dd>
              </div>
            ))}
          </dl>

          {balanceAfter !== undefined && (
            <p
              className={`text-xs ${
                insufficientBalance ? 'text-red-500' : 'text-muted-content'
              }`}
            >
              Saldo depois do envio: <strong>{formatSms(balanceAfter)}</strong>
            </p>
          )}

          {insufficientBalance && (
            <div className="flex flex-wrap items-center justify-between gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-600 dark:text-red-400">
              <span>
                Saldo insuficiente: faltam{' '}
                {formatSms(Math.abs(balanceAfter ?? 0))} para este envio.
              </span>
              <Link
                href="/payments"
                className="font-semibold underline underline-offset-2"
              >
                Carregar saldo
              </Link>
            </div>
          )}

          <div className="flex flex-wrap justify-end gap-3 border-t border-dashed border-border-ui pt-5">
            <button
              type="button"
              disabled={loading}
              className="inline-flex h-10 items-center rounded-lg border border-border-ui bg-surface px-5 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover disabled:pointer-events-none disabled:opacity-50"
            >
              Guardar rascunho
            </button>

            <button
              type="submit"
              disabled={!canSend}
              className="inline-flex h-10 items-center gap-2 rounded-lg bg-primary px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
            >
              <Send size={16} aria-hidden />
              {loading
                ? scheduled
                  ? 'A agendar...'
                  : 'A enviar...'
                : scheduled
                  ? 'Agendar'
                  : 'Enviar agora'}
            </button>
          </div>
        </SectionCard>
      </div>

      {/* Pré-visualização (só desktop) */}
      <aside className="hidden lg:sticky lg:top-4 lg:block">
        <div className="flex h-full flex-col gap-3 rounded-2xl border border-border-ui bg-surface p-4 shadow-sm">
          <div className="flex shrink-0 flex-col gap-0.5">
            <h3 className="text-sm font-semibold text-primary-content">
              Pré-visualização
            </h3>
            <p className="text-xs text-muted-content">
              Veja como o destinatário receberá a mensagem.
            </p>
          </div>

          <PhonePreview
            type={type}
            senderName={senderName}
            message={previewMessage}
            time={time}
            className="min-h-0 flex-1"
          />
        </div>
      </aside>

      <SelectContactsModal
        contacts={availableContacts}
        selected={contacts}
        onConfirm={handleConfirmContacts}
      />
    </form>
  );
}

export default SmsForm;
