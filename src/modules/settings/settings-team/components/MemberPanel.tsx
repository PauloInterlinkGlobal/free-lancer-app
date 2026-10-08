'use client';

import {
  roleHint,
  roleLabel,
  roles,
} from '@/modules/settings/settings-team/constants/roles';
import { ArrowLeft, X } from 'lucide-react';
import { useState } from 'react';
import type { IMemberDraft, ITeamMember, TeamRole } from '../interfaces/team';
import { formatLastActive, isValidEmail } from '../utils/team-utils';
import { MemberAvatar } from './MemberAvatar';

interface MemberPanelProps {
  member?: ITeamMember;
  isSelf: boolean;

  existingEmails: string[];
  onClose: () => void;
  onSave: (id: string, draft: IMemberDraft) => void;
  onCreate: (draft: IMemberDraft) => void;
  onToggleSuspend: (id: string) => void;
  onRemove: (id: string) => void;
}

const inputClass =
  'w-full rounded-xl border border-border-ui bg-surface px-3 py-2.5 text-sm text-primary-content outline-none transition-colors placeholder:text-muted-content focus:border-primary disabled:opacity-60';

const labelClass =
  'mb-1.5 block text-[13px] font-semibold text-primary-content';

export function MemberPanel({
  member,
  isSelf,
  existingEmails,
  onClose,
  onSave,
  onCreate,
  onToggleSuspend,
  onRemove,
}: MemberPanelProps) {
  const isNew = !member;
  const isSuspended = member?.status === 'suspended';
  const emailEditable = isNew;
  const locked = isSelf;

  const [initialFirst = '', ...initialRest] = (member?.name ?? '').split(' ');

  const [firstName, setFirstName] = useState(initialFirst);
  const [lastName, setLastName] = useState(initialRest.join(' '));
  const [email, setEmail] = useState(member?.email ?? '');
  const [role, setRole] = useState<TeamRole>(member?.role ?? 'sales');
  const [confirming, setConfirming] = useState(false);

  const duplicate =
    emailEditable && existingEmails.includes(email.trim().toLowerCase());
  const valid =
    firstName.trim().length > 1 && isValidEmail(email) && !duplicate;

  function buildDraft(): IMemberDraft {
    return {
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      role,
    };
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!valid) return;
    if (member) onSave(member.id, buildDraft());
    else onCreate(buildDraft());
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-border-ui bg-surface p-5 sm:p-6"
    >
      {/* Cabeçalho */}
      <div className="flex items-start gap-3">
        <button
          type="button"
          onClick={onClose}
          aria-label="Voltar à lista"
          className="-ml-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-primary-content transition-colors hover:bg-surface-raised lg:hidden"
        >
          <ArrowLeft size={20} aria-hidden />
        </button>

        {member ? <MemberAvatar member={member} size="lg" /> : null}

        <div className="min-w-0 flex-1">
          <h2 className="truncate text-[17px] font-semibold text-primary-content">
            {member ? member.name : 'Novo membro'}
          </h2>
          <p className="truncate text-[13px] text-muted-content">
            {member
              ? member.email
              : 'Preencha os dados para adicionar à equipa.'}
          </p>
          {member && (
            <p className="mt-0.5 text-xs text-muted-content">
              Último acesso: {formatLastActive(member.lastActive)}
            </p>
          )}
        </div>

        <button
          type="button"
          onClick={onClose}
          aria-label="Fechar painel"
          className="hidden h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-content transition-colors hover:bg-surface-raised hover:text-primary-content lg:flex"
        >
          <X size={18} aria-hidden />
        </button>
      </div>

      {/* Dados */}
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="member-first-name" className={labelClass}>
              Nome
            </label>
            <input
              id="member-first-name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="Nome"
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="member-last-name" className={labelClass}>
              Apelido
            </label>
            <input
              id="member-last-name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Apelido"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="member-email" className={labelClass}>
            Email
          </label>
          <input
            id="member-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!emailEditable}
            placeholder="nome@empresa.ao"
            className={inputClass}
          />
          {duplicate && (
            <p className="mt-1.5 text-xs text-red-500">
              Este email já pertence à equipa.
            </p>
          )}
        </div>
      </div>

      {/* Cargo */}
      <div>
        <span className={labelClass}>Cargo</span>
        <div
          role="radiogroup"
          aria-label="Cargo"
          className="grid grid-cols-2 gap-2"
        >
          {roles.map((r) => {
            const active = role === r;
            return (
              <button
                key={r}
                type="button"
                role="radio"
                aria-checked={active}
                disabled={isSelf}
                onClick={() => setRole(r)}
                className={`rounded-[14px] border p-3 text-left transition-colors disabled:cursor-not-allowed disabled:opacity-60 ${
                  active
                    ? 'border-2 border-primary bg-surface-raised'
                    : 'border-border-ui bg-surface hover:bg-item-hover'
                }`}
              >
                <span className="block text-[13px] font-semibold text-primary-content">
                  {roleLabel[r]}
                </span>
                <span className="mt-0.5 block text-[11px] leading-snug text-muted-content">
                  {roleHint[r]}
                </span>
              </button>
            );
          })}
        </div>
        {isSelf && (
          <p className="mt-1.5 text-xs text-muted-content">
            Não pode alterar o seu próprio cargo.
          </p>
        )}
      </div>

      {/* Ações */}
      <div className="flex flex-col gap-2.5 border-t border-dashed border-border-ui pt-5">
        <button
          type="submit"
          disabled={!valid}
          className="inline-flex h-11 items-center justify-center rounded-xl bg-primary px-5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:pointer-events-none disabled:opacity-50"
        >
          {isNew ? 'Adicionar membro' : 'Guardar alterações'}
        </button>

        {isNew && (
          <button
            type="button"
            onClick={onClose}
            className="inline-flex h-11 items-center justify-center rounded-xl border border-border-ui bg-surface px-5 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
          >
            Cancelar
          </button>
        )}

        {member && !confirming && (
          <div className="flex gap-2.5">
            <button
              type="button"
              disabled={locked}
              onClick={() => onToggleSuspend(member.id)}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-border-ui bg-surface px-4 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover disabled:pointer-events-none disabled:opacity-50"
            >
              {isSuspended ? 'Reativar' : 'Suspender'}
            </button>
            <button
              type="button"
              disabled={locked}
              onClick={() => setConfirming(true)}
              className="inline-flex h-11 flex-1 items-center justify-center rounded-xl border border-red-500/40 bg-surface px-4 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10 disabled:pointer-events-none disabled:opacity-50"
            >
              Remover
            </button>
          </div>
        )}

        {member && locked && (
          <p className="text-xs text-muted-content">
            Não pode suspender nem remover a sua própria conta.
          </p>
        )}

        {member && confirming && (
          <div className="flex flex-col gap-3 rounded-xl border border-red-500/30 bg-red-500/10 p-4">
            <p className="text-[13px] text-primary-content">
              Remover {member.name} da equipa? Perde o acesso à conta, mas o
              histórico de envios mantém-se.
            </p>
            <div className="flex gap-2.5">
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg border border-border-ui bg-surface px-4 text-sm font-medium text-primary-content transition-colors hover:bg-item-hover"
              >
                Voltar
              </button>
              <button
                type="button"
                onClick={() => onRemove(member.id)}
                className="inline-flex h-10 flex-1 items-center justify-center rounded-lg bg-red-500 px-4 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Confirmar
              </button>
            </div>
          </div>
        )}
      </div>
    </form>
  );
}
