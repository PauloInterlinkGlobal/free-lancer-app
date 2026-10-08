'use client';

import { groupMeta } from '@/modules/settings/settings-team/constants/roles';
import { Plus, Search, UserRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import type { IMemberDraft, ITeamMember } from '../interfaces/team';
import { fullName, groupMembers } from '../utils/team-utils';
import { MemberPanel } from './MemberPanel';
import { TeamMemberRow } from './TeamMemberRow';
type Panel = { kind: 'member'; id: string } | { kind: 'new' } | null;

interface TeamWorkspaceProps {
  members: ITeamMember[];
  currentUserId: string;
}

export function TeamWorkspace({
  members: initialMembers,
  currentUserId,
}: TeamWorkspaceProps) {
  const [members, setMembers] = useState<ITeamMember[]>(initialMembers);
  const [query, setQuery] = useState('');
  const [panel, setPanel] = useState<Panel>(null);

  const selected =
    panel?.kind === 'member'
      ? members.find((m) => m.id === panel.id)
      : undefined;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return members;
    return members.filter(
      (m) =>
        m.name.toLowerCase().includes(q) || m.email.toLowerCase().includes(q)
    );
  }, [members, query]);

  const groups = useMemo(() => groupMembers(filtered), [filtered]);

  function handleCreate(draft: IMemberDraft) {
    const id = `m${Date.now()}`;
    setMembers((prev) => [
      ...prev,
      {
        id,
        name: fullName(draft),
        email: draft.email,
        role: draft.role,
        status: 'active',
        lastActive: null,
      },
    ]);
    setPanel({ kind: 'member', id });
  }

  function handleSave(id: string, draft: IMemberDraft) {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id ? { ...m, name: fullName(draft), role: draft.role } : m
      )
    );
  }

  function handleToggleSuspend(id: string) {
    setMembers((prev) =>
      prev.map((m) =>
        m.id === id
          ? { ...m, status: m.status === 'suspended' ? 'active' : 'suspended' }
          : m
      )
    );
  }

  function handleRemove(id: string) {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    setPanel(null);
    // TODO: chamar a API
  }

  return (
    <>
      {/* Pesquisa e botão */}
      <div className="flex flex-wrap items-center gap-2.5">
        <label className="flex h-11 min-w-[240px] flex-1 items-center gap-2.5 rounded-xl border border-border-ui bg-surface px-4 transition-colors focus-within:border-primary">
          <Search
            size={18}
            aria-hidden
            className="shrink-0 text-muted-content"
          />
          <span className="sr-only">Procurar membro</span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Procurar por nome ou email"
            className="w-full bg-transparent text-sm text-primary-content outline-none placeholder:text-muted-content"
          />
        </label>

        <button
          type="button"
          onClick={() => setPanel({ kind: 'new' })}
          className="inline-flex h-11 shrink-0 items-center gap-2 rounded-xl bg-primary px-5 text-sm font-medium text-white transition-opacity hover:opacity-90"
        >
          <Plus size={16} aria-hidden />
          Adicionar membro
        </button>
      </div>

      <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
        {/* Lista agrupada por cargo */}
        <div className="overflow-hidden rounded-2xl border border-border-ui bg-surface">
          {filtered.length === 0 ? (
            <p className="px-5 py-10 text-center text-sm text-muted-content">
              Nenhum membro encontrado.
            </p>
          ) : (
            groups
              .filter((g) => g.members.length > 0)
              .map((group) => (
                <section
                  key={group.key}
                  aria-label={groupMeta[group.key].label}
                >
                  <h3 className="flex items-center gap-2.5 px-4 pb-2 pt-4 text-xs font-semibold uppercase tracking-wider text-muted-content">
                    <span
                      className={`h-2.5 w-2.5 rounded-[3px] ${groupMeta[group.key].dot}`}
                    />
                    {groupMeta[group.key].label}
                  </h3>
                  <div>
                    {group.members.map((member) => (
                      <TeamMemberRow
                        key={member.id}
                        member={member}
                        selected={
                          panel?.kind === 'member' && panel.id === member.id
                        }
                        onSelect={() =>
                          setPanel({ kind: 'member', id: member.id })
                        }
                      />
                    ))}
                  </div>
                </section>
              ))
          )}
        </div>

        <aside
          className={`${
            panel
              ? 'fixed inset-x-0 bottom-0 top-20 z-40 overflow-y-auto bg-background p-4 sm:p-6'
              : 'hidden'
          } lg:sticky lg:top-6 lg:z-auto lg:block lg:overflow-visible lg:bg-transparent lg:p-0`}
        >
          {panel?.kind === 'new' && (
            <MemberPanel
              key="new"
              isSelf={false}
              existingEmails={members.map((m) => m.email.toLowerCase())}
              onClose={() => setPanel(null)}
              onSave={handleSave}
              onCreate={handleCreate}
              onToggleSuspend={handleToggleSuspend}
              onRemove={handleRemove}
            />
          )}

          {panel?.kind === 'member' && selected && (
            <MemberPanel
              key={selected.id}
              member={selected}
              isSelf={selected.id === currentUserId}
              existingEmails={members
                .filter((m) => m.id !== selected.id)
                .map((m) => m.email.toLowerCase())}
              onClose={() => setPanel(null)}
              onSave={handleSave}
              onCreate={handleCreate}
              onToggleSuspend={handleToggleSuspend}
              onRemove={handleRemove}
            />
          )}

          {!panel && (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border-ui px-6 py-14 text-center">
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface-raised text-muted-content">
                <UserRound size={22} aria-hidden />
              </span>
              <p className="text-sm font-medium text-primary-content">
                Selecione um membro
              </p>
              <p className="text-xs text-muted-content">
                Veja e edite o cargo e o limite de SMS, ou adicione alguém novo.
              </p>
            </div>
          )}
        </aside>
      </div>
    </>
  );
}
