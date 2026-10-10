'use client';

import { DeleteModal } from '@/core/components/Modal/DeleteModal';
import { useToastStore } from '@/core/store/toast.store';
import { contactsMock } from '@/modules/contacts/contacts-geral/mocks/contacts.mock';
import { CreateGroupModal } from '@/modules/contacts/contacts-groups/components/create/CreateGroupModal';
import type { GroupFormValues } from '@/modules/contacts/contacts-groups/components/GroupForm';
import { UpdateGroupModal } from '@/modules/contacts/contacts-groups/components/update/UpdateGroupModal';
import { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';
import {
  DEFAULT_TONE,
  getGroupTones,
  getShare,
  getTotalContacts,
} from '@/modules/contacts/contacts-groups/utils/group-visuals';
import { useMemo, useState } from 'react';
import { CreateGroupCard } from './CreateGroupCard';
import { GroupCard } from './GroupCard';
import { DetailGroupModal } from './detail/DetailGroupModal';

interface GroupsGridProps {
  groups: IGroup[];
  allGroups?: IGroup[];
}

export function GroupsGrid({ groups, allGroups = groups }: GroupsGridProps) {
  const { success } = useToastStore();

  const [createOpen, setCreateOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [viewing, setViewing] = useState<IGroup | null>(null);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<IGroup | null>(null);
  const [deleting, setDeleting] = useState<IGroup | null>(null);

  const tones = useMemo(() => getGroupTones(allGroups), [allGroups]);
  const total = useMemo(() => getTotalContacts(allGroups), [allGroups]);

  function handleEdit(group: IGroup) {
    setEditing(group);
    setUpdateOpen(true);
  }

  function handleDelete(group: IGroup) {
    setDeleting(group);
    setDeleteOpen(true);
  }

  function handleCreate(values: GroupFormValues) {
    console.log('Criar grupo', values);
    setCreateOpen(false);
    success('Grupo criado com sucesso');
  }

  function handleUpdate(values: GroupFormValues) {
    console.log('Atualizar grupo', editing?.id, values);
    setUpdateOpen(false);
    success('Grupo atualizado com sucesso');
  }

  function handleConfirmDelete() {
    console.log('Eliminar grupo', deleting?.id);
    setDeleteOpen(false);
    success('Grupo eliminado com sucesso');
  }

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {groups.map((group) => (
            <GroupCard
              key={group.id}
              group={group}
              tone={tones.get(group.id) ?? DEFAULT_TONE}
              share={getShare(group.contactsCount, total)}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}

          <CreateGroupCard onClick={() => setCreateOpen(true)} />
        </div>
      </div>

      <CreateGroupModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        contacts={contactsMock}
        onSubmit={handleCreate}
      />

      <DetailGroupModal
        isOpen={detailOpen}
        onClose={() => setDetailOpen(false)}
        group={viewing}
        contacts={contactsMock}
      />

      <UpdateGroupModal
        isOpen={updateOpen}
        onClose={() => setUpdateOpen(false)}
        contacts={contactsMock}
        onSubmit={handleUpdate}
        initialValues={{
          name: editing?.name ?? '',
          description: editing?.description ?? '',
          contactIds: [],
        }}
      />

      <DeleteModal
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        itemType="Grupo"
      />
    </>
  );
}
