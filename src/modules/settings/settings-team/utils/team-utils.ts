import {
  groupOrder,
  type GroupKey,
} from '@/modules/settings/settings-team/constants/roles';
import type { ITeamMember } from '../interfaces/team';

export function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '??';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function getGroupKey(member: ITeamMember): GroupKey {
  return member.role;
}

export function groupMembers(members: ITeamMember[]) {
  return groupOrder.map((key) => ({
    key,
    members: members.filter((m) => getGroupKey(m) === key),
  }));
}

export function usagePercent(used: number, limit: number | null) {
  if (limit === null || limit <= 0) return null;
  return Math.min(100, Math.round((used / limit) * 100));
}

export function parseLimit(value: string): number | null {
  if (value.trim() === '') return null;
  const n = Number(value);
  if (Number.isNaN(n)) return null;
  return Math.max(0, Math.floor(n));
}

export function fullName(d: { firstName: string; lastName: string }) {
  return `${d.firstName} ${d.lastName}`.trim();
}

export function countByGroup(members: ITeamMember[]) {
  const result = Object.fromEntries(
    groupOrder.map((key) => [key, 0])
  ) as Record<GroupKey, number>;
  members.forEach((m) => {
    result[getGroupKey(m)] += 1;
  });
  return result;
}

export function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Africa/Luanda',
});

export function formatLastActive(iso: string | null) {
  return iso ? dateFormatter.format(new Date(iso)) : 'Nunca entrou';
}
