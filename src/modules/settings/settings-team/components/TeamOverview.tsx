import {
  groupMeta,
  groupOrder,
  type GroupKey,
} from '@/modules/settings/settings-team/constants/roles';

interface TeamOverviewProps {
  counts: Record<GroupKey, number>;
}

export function TeamOverview({ counts }: TeamOverviewProps) {
  const people = counts.admin + counts.manager + counts.sales;
  const segments = groupOrder.filter((key) => counts[key] > 0);

  return (
    <section
      aria-label="Resumo da equipa"
      className="flex flex-col gap-3.5 rounded-2xl border border-border-ui bg-surface p-5"
    >
      <div className="flex flex-wrap items-baseline justify-between gap-3">
        <span className="text-sm font-semibold text-primary-content">
          {people} pessoa{people === 1 ? '' : 's'} na equipa
        </span>
      </div>

      <div className="flex h-2.5 gap-[3px] overflow-hidden rounded-full">
        {segments.map((key) => (
          <span
            key={key}
            className={groupMeta[key].dot}
            style={{ flex: counts[key] }}
          />
        ))}
      </div>

      <ul className="flex flex-wrap gap-x-5 gap-y-2 text-[13px] text-primary-content">
        {groupOrder.map((key) => (
          <li key={key} className="flex items-center gap-2">
            <span
              className={`h-2.5 w-2.5 rounded-[3px] ${groupMeta[key].dot}`}
            />
            {groupMeta[key].label} · {counts[key]}
          </li>
        ))}
      </ul>
    </section>
  );
}
