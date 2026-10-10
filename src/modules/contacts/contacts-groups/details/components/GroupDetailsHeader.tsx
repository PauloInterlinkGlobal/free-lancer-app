import { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';

export function GroupDetailsHeader({ group }: { group: IGroup }) {
  return (
    <header className="flex flex-col gap-3">
      <div className="flex flex-col gap-1 px-1">
        <h1 className="text-2xl font-bold text-primary-content md:text-3xl">
          {group.name}
        </h1>
        <p className="max-w-2xl text-sm text-muted-content md:text-base">
          {group.description}
        </p>
      </div>
    </header>
  );
}
