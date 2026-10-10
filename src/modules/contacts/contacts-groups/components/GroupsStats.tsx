import { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';
import {
  DEFAULT_TONE,
  formatShare,
  getGroupTones,
  getShare,
  getTotalContacts,
} from '@/modules/contacts/contacts-groups/utils/group-visuals';

interface GroupsStatsProps {
  /** Lista completa, sem filtros, para o resumo reflectir tudo. */
  groups: IGroup[];
}

const MAX_LEGEND = 6;

export function GroupsStats({ groups }: GroupsStatsProps) {
  const total = getTotalContacts(groups);
  const tones = getGroupTones(groups);

  const withContacts = groups
    .filter((group) => group.contactsCount > 0)
    .sort((a, b) => b.contactsCount - a.contactsCount);

  const legend = withContacts.slice(0, MAX_LEGEND);
  const hidden = withContacts.length - legend.length;

  const summary = withContacts
    .slice(0, 3)
    .map(
      (group) =>
        `${group.name} ${formatShare(
          getShare(group.contactsCount, total),
          group.contactsCount
        )}`
    )
    .join(', ');

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-ui bg-surface p-5">
      <h2 className="text-sm font-semibold text-primary-content">
        {total.toLocaleString()} {total === 1 ? 'contacto' : 'contactos'} em{' '}
        {groups.length} {groups.length === 1 ? 'grupo' : 'grupos'}
      </h2>

      {total > 0 ? (
        <>
          <div
            role="img"
            aria-label={`Distribuição dos contactos: ${summary}`}
            className="flex h-2.5 gap-0.5"
          >
            {withContacts.map((group) => (
              <div
                key={group.id}
                title={`${group.name}: ${group.contactsCount.toLocaleString()}`}
                style={{ flex: `${group.contactsCount} 1 0` }}
                className={`min-w-[6px] first:rounded-l-full last:rounded-r-full ${
                  (tones.get(group.id) ?? DEFAULT_TONE).bg
                }`}
              />
            ))}
          </div>

          <ul className="flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm text-primary-content">
            {legend.map((group) => (
              <li key={group.id} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 rounded-[3px] ring-1 ring-black/5 ${
                    (tones.get(group.id) ?? DEFAULT_TONE).bg
                  }`}
                />
                {group.name} · {group.contactsCount.toLocaleString()}
              </li>
            ))}
            {hidden > 0 && (
              <li className="text-muted-content">+{hidden} outros</li>
            )}
          </ul>
        </>
      ) : (
        <p className="text-sm text-muted-content">
          Ainda não há contactos nos grupos.
        </p>
      )}
    </section>
  );
}
