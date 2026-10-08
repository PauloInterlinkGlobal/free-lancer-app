import type { ITeamMember } from '../interfaces/team';
import { getInitials } from '../utils/team-utils';

interface MemberAvatarProps {
  member: Pick<ITeamMember, 'name'>;
  size?: 'md' | 'lg';
}

export function MemberAvatar({ member, size = 'md' }: MemberAvatarProps) {
  const dims =
    size === 'lg'
      ? 'h-14 w-14 rounded-2xl text-lg'
      : 'h-10 w-10 rounded-xl text-[13px]';

  return (
    <span
      aria-hidden
      className={`flex shrink-0 items-center justify-center bg-surface-subtle font-semibold text-primary-content ${dims}`}
    >
      {getInitials(member.name)}
    </span>
  );
}
