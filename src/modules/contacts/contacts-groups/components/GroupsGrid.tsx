'use client';

import { DeleteModal } from '@/core/components/Modal/DeleteModal';
import { useToastStore } from '@/core/store/toast.store';
import { contactsMock } from '@/modules/contacts/contacts-geral/mocks/contacts.mock';
import { CreateGroupModal } from '@/modules/contacts/contacts-groups/components/create/CreateGroupModal';
import type { GroupFormValues } from '@/modules/contacts/contacts-groups/components/GroupForm';
import { UpdateGroupModal } from '@/modules/contacts/contacts-groups/components/update/UpdateGroupModal';
import { IGroup } from '@/modules/contacts/contacts-groups/interfaces/groups';
import { useState } from 'react';
import { CreateGroupCard } from './CreateGroupCard';
import { GroupCard } from './GroupCard';

export function GroupsGrid({ groups }: { groups: IGroup[] }) {
  const { success } = useToastStore();

  const [createOpen, setCreateOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [editing, setEditing] = useState<IGroup | null>(null);
  const [deleting, setDeleting] = useState<IGroup | null>(null);

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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {groups.map((group) => (
          <GroupCard
            key={group.id}
            group={group}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))}

        <CreateGroupCard onClick={() => setCreateOpen(true)} />
      </div>

      <CreateGroupModal
        isOpen={createOpen}
        onClose={() => setCreateOpen(false)}
        contacts={contactsMock}
        onSubmit={handleCreate}
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
