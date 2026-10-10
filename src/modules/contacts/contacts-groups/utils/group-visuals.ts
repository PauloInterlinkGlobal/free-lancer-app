import type { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';

export interface GroupTone {
  bg: string;
  text: string;
}

const TONES: GroupTone[] = [
  { bg: 'bg-primary', text: 'text-white' },
  { bg: 'bg-primary/80', text: 'text-white' },
  { bg: 'bg-primary/60', text: 'text-primary-content' },
  { bg: 'bg-primary/40', text: 'text-primary-content' },
  { bg: 'bg-primary/25', text: 'text-primary-content' },
  { bg: 'bg-primary/15', text: 'text-primary-content' },
];

export const DEFAULT_TONE = TONES[TONES.length - 1];

export function getGroupTones(groups: IGroup[]): Map<IGroup['id'], GroupTone> {
  const sorted = [...groups].sort((a, b) => b.contactsCount - a.contactsCount);

  return new Map(
    sorted.map((group, index): [IGroup['id'], GroupTone] => [
      group.id,
      TONES[Math.min(index, TONES.length - 1)],
    ])
  );
}

export const getTotalContacts = (groups: IGroup[]) =>
  groups.reduce((sum, group) => sum + group.contactsCount, 0);

export const getShare = (count: number, total: number) =>
  total > 0 ? (count / total) * 100 : 0;

export const formatShare = (share: number, count: number) =>
  count > 0 && share < 1 ? '<1%' : `${Math.round(share)}%`;

export function getInitials(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '?';

  const significant = words.filter((word) => word.length > 2);
  const pool = significant.length >= 2 ? significant : words;

  if (pool.length === 1) return pool[0].slice(0, 2).toUpperCase();
  return (pool[0][0] + pool[1][0]).toUpperCase();
}
