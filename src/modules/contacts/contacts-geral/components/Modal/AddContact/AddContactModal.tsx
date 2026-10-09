'use client';

import { Input } from '@/core/components/Input';
import { Modal } from '@/core/components/Modal';
import { MultiSelect, type MultiSelectOption } from '@/core/components/Select';
import { useToastStore } from '@/core/store/toast.store';
import { useModalStore } from '@/core/store/useModalStore';
import { groupsMock } from '@/modules/contacts/contacts-groups/mocks/groups.mock';
import { AlertCircle, Plus, Sparkles, Trash2, UserPlus, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';
import { ICreateContactInput } from '../../../interfaces/contacts';
import {
  ContactValidationErrors,
  validateContact,
} from '../../../utils/contact-validation';

interface VariableRow {
  id: string;
  key: string;
  value: string;
}

interface AddContactModalProps {
  existingNumbers?: string[];
  groupOptions?: MultiSelectOption[];
  initialValues?: Partial<ICreateContactInput>;
  onCreate?: (contact: ICreateContactInput) => void | Promise<void>;
  onClose?: () => void;
}

const DEFAULT_GROUP_OPTIONS: MultiSelectOption[] = groupsMock.map((g) => ({
  value: g.name,
  label: g.name,
}));

export function AddContactModal({
  existingNumbers = [],
  groupOptions = DEFAULT_GROUP_OPTIONS,
  initialValues,
  onCreate,
  onClose,
}: AddContactModalProps) {
  const { closeModal } = useModalStore();
  const { success } = useToastStore();

  const [name, setName] = useState(initialValues?.name || '');
  const [surname, setSurname] = useState(initialValues?.surname || '');
  const [number, setNumber] = useState(initialValues?.number || '');
  const [email, setEmail] = useState(initialValues?.email || '');
  const [groups, setGroups] = useState<string[]>(initialValues?.groups || []);
  const [variables, setVariables] = useState<VariableRow[]>(() => {
    if (initialValues?.variables) {
      return Object.entries(initialValues.variables).map(([key, value]) => ({
        id: `var-${Math.random().toString(36).substring(2, 9)}`,
        key,
        value,
      }));
    }
    return [];
  });

  const [errors, setErrors] = useState<ContactValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Refs para focar no primeiro campo inválido
  const nameInputRef = useRef<HTMLInputElement>(null);
  const surnameInputRef = useRef<HTMLInputElement>(null);
  const numberInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const variableKeyRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const resetForm = () => {
    setName(initialValues?.name || '');
    setSurname(initialValues?.surname || '');
    setNumber(initialValues?.number || '');
    setEmail(initialValues?.email || '');
    setGroups(initialValues?.groups || []);
    if (initialValues?.variables) {
      setVariables(
        Object.entries(initialValues.variables).map(([key, value]) => ({
          id: `var-${Math.random().toString(36).substring(2, 9)}`,
          key,
          value,
        }))
      );
    } else {
      setVariables([]);
    }
    setErrors({});
    setIsSubmitting(false);
  };

  const handleClose = () => {
    resetForm();
    closeModal();
    onClose?.();
  };

  // Se initialValues mudar no futuro (reutilização para edição)
  useEffect(() => {
    if (initialValues) {
      setName(initialValues.name || '');
      setSurname(initialValues.surname || '');
      setNumber(initialValues.number || '');
      setEmail(initialValues.email || '');
      setGroups(initialValues.groups || []);
      if (initialValues.variables) {
        setVariables(
          Object.entries(initialValues.variables).map(([key, value]) => ({
            id: `var-${Math.random().toString(36).substring(2, 9)}`,
            key,
            value,
          }))
        );
      }
    }
  }, [initialValues]);

  const handleAddVariable = () => {
    if (variables.length >= 10) return;
    const newId = `var-${Date.now()}`;
    setVariables((prev) => [...prev, { id: newId, key: '', value: '' }]);
  };

  const handleRemoveVariable = (id: string) => {
    setVariables((prev) => prev.filter((v) => v.id !== id));
    delete variableKeyRefs.current[id];
  };

  const handleVariableChange = (
    id: string,
    field: 'key' | 'value',
    val: string
  ) => {
    setVariables((prev) =>
      prev.map((v) => (v.id === id ? { ...v, [field]: val } : v))
    );
    if (errors.variables) {
      setErrors((prev) => ({ ...prev, variables: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    // Converter lista de variáveis para Record<string, string>
    const variablesObj: Record<string, string> = {};
    for (const v of variables) {
      const trimmedKey = v.key.trim();
      if (trimmedKey || v.value.trim()) {
        variablesObj[trimmedKey] = v.value.trim();
      }
    }

    const result = validateContact(
      {
        name,
        surname,
        number,
        email,
        groups,
        variables: variablesObj,
      },
      existingNumbers
    );

    if (!result.isValid) {
      setErrors(result.errors);

      // Focar no primeiro campo inválido
      if (result.errors.name) {
        nameInputRef.current?.focus();
      } else if (result.errors.surname) {
        surnameInputRef.current?.focus();
      } else if (result.errors.number) {
        numberInputRef.current?.focus();
      } else if (result.errors.email) {
        emailInputRef.current?.focus();
      } else if (result.errors.variables) {
        // Encontrar a primeira linha com erro
        const firstInvalidKey = Object.keys(result.errors.variables)[0];
        const matchingRow = variables.find((v) => v.key.trim() === firstInvalidKey);
        if (matchingRow && variableKeyRefs.current[matchingRow.id]) {
          variableKeyRefs.current[matchingRow.id]?.focus();
        }
      }
      return;
    }

    if (!result.normalized) return;

    setIsSubmitting(true);
    try {
      if (onCreate) {
        await onCreate(result.normalized);
      }
      success('Contacto adicionado');
      handleClose();
    } catch {
      // Caso ocorra erro na submissão
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal id="ADD_CONTACT" onClose={handleClose}>
      <div className="relative flex w-full max-w-xl max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100vh-3.5rem)] flex-col overflow-hidden rounded-2xl border border-border-ui bg-surface shadow-2xl sm:rounded-3xl">
        {/* Header - Fixo */}
        <div className="flex shrink-0 items-center justify-between border-b border-dashed border-border-ui px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <UserPlus className="h-5 w-5" aria-hidden />
            </div>
            <div>
              <h2 className="text-base font-semibold text-primary-content">
                Adicionar Contacto
              </h2>
              <p className="text-xs text-muted-content">
                Insira os dados do contacto para envio de mensagens SMS.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleClose}
            aria-label="Fechar"
            className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body - Rolável */}
        <form
          id="add-contact-form"
          onSubmit={handleSubmit}
          className="flex-1 min-h-0 overflow-y-auto overscroll-contain p-5 flex flex-col gap-4"
          noValidate
        >
          {/* Nome e Sobrenome */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="contact-first-name"
                className="text-sm font-medium text-primary-content"
              >
                Primeiro Nome *
              </label>
              <input
                ref={nameInputRef}
                id="contact-first-name"
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                }}
                placeholder="Ex: Manuel"
                aria-invalid={Boolean(errors.name)}
                aria-describedby={errors.name ? 'contact-name-error' : undefined}
                className={`rounded-lg border bg-surface px-3 py-2.5 text-sm text-primary-content placeholder:text-muted-content outline-none transition-colors ${
                  errors.name
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-border-ui focus:border-primary focus:ring-1 focus:ring-primary'
                }`}
                autoFocus
              />
              {errors.name && (
                <p id="contact-name-error" className="text-xs text-red-500 font-medium">
                  {errors.name}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-1.5 w-full">
              <label
                htmlFor="contact-surname"
                className="text-sm font-medium text-primary-content"
              >
                Sobrenome{' '}
                <span className="text-xs font-normal text-muted-content">(Opcional)</span>
              </label>
              <input
                ref={surnameInputRef}
                id="contact-surname"
                type="text"
                value={surname}
                onChange={(e) => {
                  setSurname(e.target.value);
                  if (errors.surname) setErrors((prev) => ({ ...prev, surname: undefined }));
                }}
                placeholder="Ex: da Silva"
                aria-invalid={Boolean(errors.surname)}
                aria-describedby={errors.surname ? 'contact-surname-error' : undefined}
                className={`rounded-lg border bg-surface px-3 py-2.5 text-sm text-primary-content placeholder:text-muted-content outline-none transition-colors ${
                  errors.surname
                    ? 'border-red-500 focus:border-red-500 focus:ring-1 focus:ring-red-500'
                    : 'border-border-ui focus:border-primary focus:ring-1 focus:ring-primary'
                }`}
              />
              {errors.surname && (
                <p id="contact-surname-error" className="text-xs text-red-500 font-medium">
                  {errors.surname}
                </p>
              )}
            </div>
          </div>

          {/* Telemóvel Angolano com prefixo visível */}
          <div className="flex flex-col gap-1.5 w-full">
            <label
              htmlFor="contact-phone"
              className="text-sm font-medium text-primary-content"
            >
              Telemóvel *
            </label>
            <div
              className={`relative flex w-full items-center rounded-lg border bg-surface transition-colors ${
                errors.number
                  ? 'border-red-500 focus-within:border-red-500 focus-within:ring-1 focus-within:ring-red-500'
                  : 'border-border-ui focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'
              }`}
            >
              <div className="flex items-center gap-1.5 border-r border-border-ui bg-surface-raised px-3 py-2.5 text-xs font-semibold text-primary-content shrink-0 rounded-l-lg select-none">
                <span className="text-sm">🇦🇴</span>
                <span>+244</span>
              </div>
              <input
                ref={numberInputRef}
                id="contact-phone"
                type="tel"
                value={number}
                onChange={(e) => {
                  setNumber(e.target.value);
                  if (errors.number) setErrors((prev) => ({ ...prev, number: undefined }));
                }}
                placeholder="923 456 789"
                aria-invalid={Boolean(errors.number)}
                aria-describedby={errors.number ? 'contact-phone-error' : undefined}
                className="min-w-0 flex-1 w-full bg-transparent px-3 py-2.5 text-sm font-mono text-primary-content placeholder:text-muted-content outline-none"
              />
            </div>
            {errors.number ? (
              <p id="contact-phone-error" className="text-xs text-red-500 font-medium">
                {errors.number}
              </p>
            ) : (
              <p className="text-[11px] text-muted-content">
                Aceita números com ou sem prefixo (9 dígitos começando por 9).
              </p>
            )}
          </div>

          {/* Email */}
          <div className="flex flex-col gap-1.5 w-full">
            <Input
              ref={emailInputRef}
              id="contact-email"
              type="email"
              label="Email (Opcional)"
              placeholder="exemplo@dominio.ao"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (errors.email) setErrors((prev) => ({ ...prev, email: undefined }));
              }}
              error={errors.email}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? 'contact-email-error' : undefined}
            />
          </div>

          {/* Grupos (MultiSelect) */}
          <div className="flex flex-col gap-1.5 w-full">
            <MultiSelect
              label="Grupos (Opcional)"
              placeholder="Selecione os grupos para este contacto..."
              options={groupOptions}
              value={groups}
              onChange={(val) => setGroups(val as string[])}
              helperText="Pode associar o contacto a múltiplos grupos simultaneamente."
            />
          </div>

          {/* Secção de Variáveis Personalizadas */}
          <div className="mt-2 flex flex-col gap-3 rounded-2xl border border-dashed border-border-ui bg-surface-raised/40 p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-primary" />
                <span className="text-sm font-semibold text-primary-content">
                  Variáveis Personalizadas
                </span>
              </div>
              <span className="text-xs text-muted-content">
                {variables.length}/10 adicionadas
              </span>
            </div>

            <p className="text-xs text-muted-content leading-relaxed">
              Adicione dados dinâmicos específicos (ex: cidade, empresa, código) para personalizar as suas mensagens SMS.
            </p>

            {errors.generalVariables && (
              <div className="flex items-center gap-2 rounded-xl bg-red-500/10 p-2.5 text-xs text-red-500">
                <AlertCircle size={14} className="shrink-0" />
                <span>{errors.generalVariables}</span>
              </div>
            )}

            {variables.length > 0 && (
              <div className="flex flex-col gap-2.5 pt-1">
                {variables.map((item, index) => {
                  const errorMsg = errors.variables?.[item.key.trim()];
                  const displayToken = item.key.trim()
                    ? `{{${item.key.trim()}}}`
                    : '{{chave}}';

                  return (
                    <div
                      key={item.id}
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
                            onClick={() => handleRemoveVariable(item.id)}
                            aria-label={`Remover variável #${index + 1}`}
                            className="rounded-lg p-1 text-muted-content transition-colors hover:bg-red-500/10 hover:text-red-500"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        <input
                          ref={(el) => {
                            variableKeyRefs.current[item.id] = el;
                          }}
                          type="text"
                          placeholder="Chave (ex: empresa)"
                          value={item.key}
                          onChange={(e) =>
                            handleVariableChange(item.id, 'key', e.target.value)
                          }
                          className="rounded-lg border border-border-ui bg-surface px-2.5 py-1.5 font-mono text-xs text-primary-content placeholder:text-muted-content outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                        <input
                          type="text"
                          placeholder="Valor (ex: Sonangol)"
                          value={item.value}
                          onChange={(e) =>
                            handleVariableChange(item.id, 'value', e.target.value)
                          }
                          className="rounded-lg border border-border-ui bg-surface px-2.5 py-1.5 text-xs text-primary-content placeholder:text-muted-content outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                        />
                      </div>

                      {errorMsg && (
                        <p className="text-[11px] text-red-500 font-medium">
                          {errorMsg}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            <button
              type="button"
              onClick={handleAddVariable}
              disabled={variables.length >= 10}
              className={`inline-flex items-center justify-center gap-1.5 rounded-xl border border-dashed border-border-ui py-2 text-xs font-semibold transition-all ${
                variables.length >= 10
                  ? 'cursor-not-allowed opacity-50 bg-surface text-muted-content'
                  : 'bg-surface text-primary hover:bg-item-hover hover:border-primary active:scale-[0.99]'
              }`}
            >
              <Plus size={14} />
              Adicionar variável
            </button>
          </div>
        </form>

        {/* Footer - Fixo */}
        <div className="flex shrink-0 items-center justify-end gap-2 border-t border-dashed border-border-ui px-5 py-4">
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-lg border border-border-ui bg-surface-raised px-4 py-2 text-sm text-secondary-content transition-colors hover:bg-item-hover hover:text-primary-content"
          >
            Cancelar
          </button>

          <button
            type="submit"
            form="add-contact-form"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-sm transition-opacity hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
          >
            {isSubmitting ? 'A guardar...' : 'Guardar Contacto'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
