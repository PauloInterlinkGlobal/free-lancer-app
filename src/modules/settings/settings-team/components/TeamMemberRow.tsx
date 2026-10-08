import { roleLabel } from '@/modules/settings/settings-team/constants/roles';
import { ChevronRight } from 'lucide-react';
import type { ITeamMember } from '../interfaces/team';
import { formatLastActive } from '../utils/team-utils';
import { MemberAvatar } from './MemberAvatar';

interface TeamMemberRowProps {
  member: ITeamMember;
  selected: boolean;
  onSelect: () => void;
}

export function TeamMemberRow({
  member,
  selected,
  onSelect,
}: TeamMemberRowProps) {
  const suspended = member.status === 'suspended';

  return (
    <button
      type="button"
      onClick={onSelect}
      aria-pressed={selected}
      className={`flex w-full items-center gap-3.5 border-t border-border-ui px-4 py-3 text-left transition-colors first:border-t-0 ${
        selected
          ? 'bg-surface-raised shadow-[inset_3px_0_0_rgb(var(--color-primary))]'
          : 'hover:bg-item-hover'
      }`}
    >
      <MemberAvatar member={member} />

      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-2">
          <span className="truncate text-sm font-semibold text-primary-content">
            {member.name}
          </span>
          <span className="rounded-full bg-surface-raised px-2.5 py-0.5 text-xs font-medium text-primary-content">
            {roleLabel[member.role]}
          </span>
          {suspended && (
            <span className="rounded-full bg-amber-500/10 px-2.5 py-0.5 text-xs font-medium text-amber-600">
              Suspenso
            </span>
          )}
        </span>

        <span className="mt-0.5 block truncate text-[13px] text-muted-content">
          {member.email}
        </span>
      </span>

      <span className="hidden shrink-0 text-xs text-muted-content md:block">
        {formatLastActive(member.lastActive)}
      </span>

      <ChevronRight
        size={16}
        aria-hidden
        className="shrink-0 text-muted-content"
      />
    </button>
  );
}
