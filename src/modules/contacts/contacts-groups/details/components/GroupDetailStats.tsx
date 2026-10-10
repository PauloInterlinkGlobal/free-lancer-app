import { statusLabel } from '@/modules/contacts/contacts-geral/constants/contacts';
import { ContactStatus } from '@/modules/contacts/contacts-geral/interfaces/contacts';
import type { GroupDetails } from '@/modules/contacts/contacts-groups/details/interfaces/group-details';

interface GroupDetailStatsProps {
  groupName: string;
  stats: GroupDetails['stats'];
}

const STATUSES: { status: ContactStatus; bar: string }[] = [
  { status: 'active', bar: 'bg-green-500' },
  { status: 'inactive', bar: 'bg-gray-400' },
  { status: 'blocked', bar: 'bg-red-500' },
];

export function GroupDetailStats({ groupName, stats }: GroupDetailStatsProps) {
  const { total, byStatus } = stats;

  const segments = STATUSES.map((item) => ({
    ...item,
    count: byStatus[item.status],
  })).filter((item) => item.count > 0);

  const summary = segments
    .map((item) => `${statusLabel[item.status]} ${item.count}`)
    .join(', ');

  return (
    <section className="flex flex-col gap-4 rounded-2xl border border-ui bg-surface p-5">
      <h2 className="text-sm font-semibold text-primary-content">
        {total.toLocaleString()} {total === 1 ? 'contacto' : 'contactos'} em{' '}
        {groupName}
      </h2>

      {total > 0 ? (
        <>
          <div
            role="img"
            aria-label={`Estado dos contactos: ${summary}`}
            className="flex h-2.5 gap-0.5"
          >
            {segments.map((item) => (
              <div
                key={item.status}
                title={`${statusLabel[item.status]}: ${item.count.toLocaleString()}`}
                style={{ flex: `${item.count} 1 0` }}
                className={`min-w-[6px] first:rounded-l-full last:rounded-r-full ${item.bar}`}
              />
            ))}
          </div>

          <ul className="flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm text-primary-content">
            {segments.map((item) => (
              <li key={item.status} className="flex items-center gap-2">
                <span
                  aria-hidden
                  className={`h-2.5 w-2.5 rounded-[3px] ${item.bar}`}
                />
                {statusLabel[item.status]} · {item.count.toLocaleString()}
              </li>
            ))}
          </ul>
        </>
      ) : (
        <p className="text-sm text-muted-content">
          Este grupo ainda não tem contactos.
        </p>
      )}
    </section>
  );
}
