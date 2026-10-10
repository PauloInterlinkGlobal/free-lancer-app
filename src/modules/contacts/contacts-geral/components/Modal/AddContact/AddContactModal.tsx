'use client';

import { Modal } from '@/core/components/Modal';
import { MultiSelect, type MultiSelectOption } from '@/core/components/Select';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { AlertCircle, Plus, Sparkles, Trash2, UserPlus, X } from 'lucide-react';
import { useActionState, useEffect, useRef, useState } from 'react';
import { createContactAction } from '../../../actions/contacts.actions';
import type {
  ContactFormErrors,
  ContactFormState,
  ICreateContactInput,
} from '../../../interfaces/contacts';

const MAX_CUSTOM_VARIABLES = 10;

interface VariableRow {
  id: string;
  key: string;
  value: string;
}

let rowSequence = 0;
const createRowId = () => `var-row-${++rowSequence}`;

const toVariableRows = (variables?: Record<string, string>): VariableRow[] =>
  Object.entries(variables ?? {}).map(([key, value]) => ({
    id: createRowId(),
    key,
    value: String(value),
  }));

const initialState: ContactFormState = { ok: false, errors: {} };

const inputClass = (hasError: boolean) =>
  `rounded-lg border bg-surface px-3 py-2.5 text-sm text-primary-content placeholder:text-muted-content outline-none transition-colors ${
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
      : 'border-border-ui focus:border-primary focus:ring-1 focus:ring-primary'
  }`;

const rowInputClass = (hasError: boolean) =>
  `rounded-lg border bg-surface px-2.5 py-1.5 text-xs text-primary-content placeholder:text-muted-content outline-none focus:ring-1 ${
    hasError
      ? 'border-red-500 focus:border-red-500 focus:ring-red-500'
      : 'border-border-ui focus:border-primary focus:ring-primary'
  }`;

interface AddContactModalProps {
  /** Grupos disponíveis, já preparados no servidor. */
  groupOptions: MultiSelectOption[];
  /** Valores iniciais. Preparado para reutilização em EDIT_CONTACT (sem edição nesta fase). */
  initialValues?: Partial<ICreateContactInput>;
}

// O conteúdo do Modal só existe enquanto o modal está aberto. Por isso o estado
// do formulário (campos, linhas e erros) repõe-se sozinho ao fechar por qualquer via.
export function AddContactModal({
  groupOptions,
  initialValues,
}: AddContactModalProps) {
  return (
    <Modal id="ADD_CONTACT">
      <AddContactForm groupOptions={groupOptions} initialValues={initialValues} />
    </Modal>
  );
}

function AddContactForm({
  groupOptions,
  initialValues,
}: AddContactModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const [state, formAction, isPending] = useActionState(
    createContactAction,
    initialState
  );

  const [name, setName] = useState(initialValues?.name ?? '');
  const [surname, setSurname] = useState(initialValues?.surname ?? '');
  const [number, setNumber] = useState(initialValues?.number ?? '');
  const [email, setEmail] = useState(initialValues?.email ?? '');
  const [groups, setGroups] = useState<string[]>(initialValues?.groups ?? []);
  const [rows, setRows] = useState<VariableRow[]>(() =>
    toVariableRows(initialValues?.variables)
  );

  // Erros do servidor que o utilizador já começou a corrigir (ocultos até nova submissão).
  const [hidden, setHidden] = useState<Partial<Record<string, boolean>>>({});

  const nameInputRef = useRef<HTMLInputElement>(null);
  const surnameInputRef = useRef<HTMLInputElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const rowKeyRefs = useRef<Record<string, HTMLInputElement | null>>({});
  const rowsRef = useRef<VariableRow[]>(rows);
  rowsRef.current = rows;

  // Garante um único toast e um único fecho por resposta de sucesso.
  const handledState = useRef<ContactFormState | null>(null);

  useEffect(() => {
    if (!state.ok || handledState.current === state) return;
    handledState.current = state;
    success('Contacto adicionado');
    closeModal();
  }, [state, success, closeModal]);

  // Cada nova resposta do servidor volta a mostrar os seus erros.
  useEffect(() => {
    setHidden({});
  }, [state]);

  // Foca o primeiro campo com erro, só quando chega uma nova resposta do servidor.
  // Não depende de `rows`: senão roubava o foco a cada tecla.
  useEffect(() => {
    if (state.ok) return;
    const errors: ContactFormErrors = state.errors;
    if (errors.name) nameInputRef.current?.focus();
    else if (errors.surname) surnameInputRef.current?.focus();
    else if (errors.number) numberInputRef.current?.focus();
    else if (errors.email) emailInputRef.current?.focus();
    else if (errors.rows) {
      const firstIndex = Number(Object.keys(errors.rows)[0]);
      const row = rowsRef.current[firstIndex];
      if (row) rowKeyRefs.current[row.id]?.focus();
    }
  }, [state]);

  const touch = (...fields: string[]) =>
    setHidden((prev) => {
      const next = { ...prev };
      for (const field of fields) next[field] = true;
      return next;
    });

  const isHidden = (field: string) => Boolean(hidden[field]);

  const errorFor = (field: keyof ContactFormErrors) =>
    isHidden(field) ? undefined : state.errors[field];

  const nameError = errorFor('name') as string | undefined;
  const surnameError = errorFor('surname') as string | undefined;
  const numberError = errorFor('number') as string | undefined;
  const emailError = errorFor('email') as string | undefined;
  const groupsError = errorFor('groups') as string | undefined;
  const generalVariablesError = errorFor('generalVariables') as
    | string
    | undefined;

  const handleAddRow = () => {
    if (rows.length >= MAX_CUSTOM_VARIABLES) return;
    setRows((prev) => [...prev, { id: createRowId(), key: '', value: '' }]);
    touch('rows', 'variables', 'generalVariables');
  };

  const handleRemoveRow = (id: string) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
    delete rowKeyRefs.current[id];
    touch('rows', 'variables', 'generalVariables');
  };

  const handleRowChange = (id: string, field: 'key' | 'value', val: string) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: val } : row))
    );
    touch('rows', 'variables', 'generalVariables');
  };

  const canAddRow = rows.length < MAX_CUSTOM_VARIABLES;

  return (
    <div className="relative flex w-full max-w-xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100vh-3.5rem)] flex-col overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl sm:rounded-3xl">
      {/* Cabeçalho fixo */}
      <div className="flex shrink-0 items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
            <UserPlus className="h-5 w-5" aria-hidden />
          </div>
          <div>
            <h2
              id="add-contact-title"
              className="text-base font-semibold text-primary-content"
            >
              Adicionar Contacto
            </h2>
            <p className="text-xs text-muted-content">
              Insira os dados do contacto para envio de mensagens SMS.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => closeModal()}
          aria-label="Fechar"
          className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content"
        >
          <X size={18} />
        </button>
      </div>

      {/* Corpo rolável */}
      <form
        id="add-contact-form"
        action={formAction}
        className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto overscroll-contain p-5"
        noValidate
      >
        {state.errors.form && (
          <div
            role="alert"
            className="flex items-center gap-2 rounded-xl bg-red-500/10 p-2.5 text-xs text-red-500"
          >
            <AlertCircle size={14} className="shrink-0" aria-hidden />
            <span>{state.errors.form}</span>
          </div>
        )}

        {/* Nome e sobrenome */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="flex w-full flex-col gap-1.5">
            <label
              htmlFor="contact-first-name"
              className="text-sm font-medium text-primary-content"
            >
              Nome *
            </label>
            <input
              ref={nameInputRef}
              id="contact-first-name"
              name="name"
              type="text"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                touch('name');
              }}
              placeholder="Ex: Manuel"
              aria-invalid={Boolean(nameError)}
              aria-describedby={nameError ? 'contact-name-error' : undefined}
              className={inputClass(Boolean(nameError))}
            />
            {nameError && (
              <p
                id="contact-name-error"
                className="text-xs font-medium text-red-500"
              >
                {nameError}
              </p>
            )}
          </div>

          <div className="flex w-full flex-col gap-1.5">
            <label
              htmlFor="contact-surname"
              className="text-sm font-medium text-primary-content"
            >
              Sobrenome{' '}
              <span className="text-xs font-normal text-muted-content">
                (Opcional)
              </span>
            </label>
            <input
              ref={surnameInputRef}
              id="contact-surname"
              name="surname"
              type="text"
              value={surname}
              onChange={(e) => {
                setSurname(e.target.value);
                touch('surname');
              }}
              placeholder="Ex: da Silva"
              aria-invalid={Boolean(surnameError)}
              aria-describedby={
                surnameError ? 'contact-surname-error' : undefined
              }
              className={inputClass(Boolean(surnameError))}
            />
            {surnameError && (
              <p
                id="contact-surname-error"
                className="text-xs font-medium text-red-500"
              >
                {surnameError}
              </p>
            )}
          </div>
        </div>

        {/* Telemóvel com prefixo +244 visível */}
        <div className="flex w-full flex-col gap-1.5">
          <label
            htmlFor="contact-phone"
            className="text-sm font-medium text-primary-content"
          >
            Telemóvel *
          </label>
          <div
            className={`flex w-full items-center rounded-lg border bg-surface transition-colors ${
              numberError
                ? 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500'
                : 'border-border-ui focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
            }`}
          >
            <div className="flex shrink-0 select-none items-center gap-1.5 rounded-l-lg border-r border-border-ui bg-surface-raised px-3 py-2.5 text-xs font-semibold text-primary-content">
              <span className="text-sm" aria-hidden>
                🇦🇴
              </span>
              <span>+244</span>
            </div>
            <input
              ref={numberInputRef}
              id="contact-phone"
              name="number"
              type="tel"
              value={number}
              onChange={(e) => {
                setNumber(e.target.value);
                touch('number');
              }}
              placeholder="923 456 789"
              aria-invalid={Boolean(numberError)}
              aria-describedby={
                numberError ? 'contact-phone-error' : 'contact-phone-hint'
              }
              className="w-full min-w-0 flex-1 bg-transparent px-3 py-2.5 font-mono text-sm text-primary-content placeholder:text-muted-content outline-none"
            />
          </div>
          {numberError ? (
            <p id="contact-phone-error" className="text-xs font-medium text-red-500">
              {numberError}
            </p>
          ) : (
            <p id="contact-phone-hint" className="text-[11px] text-muted-content">
              Aceita números com ou sem prefixo (9 dígitos começando por 9).
            </p>
          )}
        </div>

        {/* Email (opcional) */}
        <div className="flex w-full flex-col gap-1.5">
          <label
            htmlFor="contact-email"
            className="text-sm font-medium text-primary-content"
          >
            Email{' '}
            <span className="text-xs font-normal text-muted-content">
              (Opcional)
            </span>
          </label>
          <input
            ref={emailInputRef}
            id="contact-email"
            name="email"
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              touch('email');
            }}
            placeholder="exemplo@dominio.ao"
            aria-invalid={Boolean(emailError)}
            aria-describedby={emailError ? 'contact-email-error' : undefined}
            className={inputClass(Boolean(emailError))}
          />
          {emailError && (
            <p id="contact-email-error" className="text-xs font-medium text-red-500">
              {emailError}
            </p>
          )}
        </div>

        {/* Grupos: o MultiSelect não é um campo nativo, por isso envia-se por campos ocultos */}
        <div className="flex w-full flex-col gap-1.5">
          {groups.map((group) => (
            <input key={group} type="hidden" name="groups" value={group} />
          ))}
          <MultiSelect
            label="Grupos (Opcional)"
            placeholder="Selecione os grupos para este contacto..."
            options={groupOptions}
            value={groups}
            onChange={(val) => {
              setGroups(val.map(String));
              touch('groups');
            }}
            helperText="Pode associar o contacto a múltiplos grupos simultaneamente."
          />
          {groupsError && (
            <p className="text-xs font-medium text-red-500">{groupsError}</p>
          )}
        </div>

        {/* Variáveis personalizadas */}
        <section
          aria-labelledby="contact-variables-title"
          className="mt-2 flex flex-col gap-3 rounded-2xl border border-dashed border-border-ui bg-surface-raised/40 p-4"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles size={16} className="text-primary" aria-hidden />
              <h3
                id="contact-variables-title"
                className="text-sm font-semibold text-primary-content"
              >
                Variáveis Personalizadas
              </h3>
            </div>
            <span className="text-xs text-muted-content">
              {rows.length}/{MAX_CUSTOM_VARIABLES} adicionadas
            </span>
          </div>

          <p className="text-xs leading-relaxed text-muted-content">
            Adicione dados dinâmicos específicos (ex: cidade, empresa, código)
            para personalizar as suas mensagens SMS.
          </p>

          {generalVariablesError && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-2.5 text-xs text-red-500">
              <AlertCircle size={14} className="shrink-0" aria-hidden />
              <span>{generalVariablesError}</span>
            </div>
          )}

          {rows.length > 0 && (
            <ul className="flex flex-col gap-2.5 pt-1">
              {rows.map((row, index) => {
                const trimmedKey = row.key.trim();
                const rowError = isHidden('rows')
                  ? undefined
                  : state.errors.rows?.[String(index)];
                const keyError =
                  isHidden('variables') || !trimmedKey
                    ? undefined
                    : state.errors.variables?.[trimmedKey];
                const message = rowError ?? keyError;
                const errorId = `var-row-error-${row.id}`;
                const hasError = Boolean(message);
                const displayToken = trimmedKey ? `{{${trimmedKey}}}` : '{{chave}}';

                return (
                  <li
                    key={row.id}
                    className="flex flex-col gap-1.5 rounded-xl border border-border-ui bg-surface p-2.5 shadow-sm"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[11px] font-medium text-muted-content">
                        Variável #{index + 1}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-[11px] font-bold text-primary">
                          {displayToken}
                        </span>
                        <button
                          type="button"
                          onClick={() => handleRemoveRow(row.id)}
                          aria-label={`Remover variável #${index + 1}`}
                          className="rounded-lg p-1 text-muted-content transition-colors hover:bg-red-500/10 hover:text-red-500"
                        >
                          <Trash2 size={14} aria-hidden />
                        </button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                      <input
                        ref={(el) => {
                          rowKeyRefs.current[row.id] = el;
                        }}
                        type="text"
                        name="variableKey"
                        aria-label={`Chave da variável #${index + 1}`}
                        placeholder="Chave (ex: empresa)"
                        value={row.key}
                        onChange={(e) =>
                          handleRowChange(row.id, 'key', e.target.value)
                        }
                        aria-invalid={hasError}
                        aria-describedby={hasError ? errorId : undefined}
                        className={`${rowInputClass(hasError)} font-mono`}
                      />
                      <input
                        type="text"
                        name="variableValue"
                        aria-label={`Valor da variável #${index + 1}`}
                        placeholder="Valor (ex: Sonangol)"
                        value={row.value}
                        onChange={(e) =>
                          handleRowChange(row.id, 'value', e.target.value)
                        }
                        aria-invalid={hasError}
                        aria-describedby={hasError ? errorId : undefined}
                        className={rowInputClass(hasError)}
                      />
                    </div>

                    {message && (
                      <p id={errorId} className="text-[11px] font-medium text-red-500">
                        {message}
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}

          <button
            type="button"
            onClick={handleAddRow}
            disabled={!canAddRow}
            aria-describedby={!canAddRow ? 'contact-variables-limit' : undefined}
            className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-border-ui py-2 text-xs font-semibold transition-all ${
              canAddRow
                ? 'bg-surface text-primary hover:border-primary hover:bg-item-hover active:scale-[0.99]'
                : 'cursor-not-allowed bg-surface text-muted-content opacity-50'
            }`}
          >
            <Plus size={14} aria-hidden />
            Adicionar variável
          </button>

          {!canAddRow && (
            <p
              id="contact-variables-limit"
              className="text-[11px] font-medium text-amber-600 dark:text-amber-400"
            >
              Limite de {MAX_CUSTOM_VARIABLES} variáveis personalizadas atingido.
            </p>
          )}
        </section>
      </form>

      {/* Rodapé fixo */}
      <div className="flex shrink-0 items-center justify-end gap-2 border-t border-dashed border-border-ui px-5 py-4">
        <button
          type="button"
          onClick={() => closeModal()}
          disabled={isPending}
          className="rounded-lg border border-border-ui bg-surface-raised px-4 py-2 text-sm text-secondary-content transition-colors hover:bg-item-hover hover:text-primary-content disabled:opacity-50"
        >
          Cancelar
        </button>

        <button
          type="submit"
          form="add-contact-form"
          disabled={isPending}
          aria-busy={isPending}
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
        >
          {isPending ? 'A guardar...' : 'Guardar Contacto'}
        </button>
      </div>
    </div>
  );
}
