import { groupsMock } from '@/modules/contacts/contacts-groups/mocks/groups.mock';
import { ImportWizard } from '@/modules/contacts/contacts-import/components/ImportWizard';

export default async function ContactsImportPage() {
  const groups = groupsMock.map((g) => ({ value: g.id, label: g.name }));

  return <ImportWizard groups={groups} />;
}
