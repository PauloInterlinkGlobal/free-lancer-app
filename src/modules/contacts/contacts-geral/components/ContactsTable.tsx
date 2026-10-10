// Camada 2 (servidor): repassa os dados já prontos à folha cliente que monta
// as colunas, a paginação e os modais de ver, editar e eliminar.
import {
  ContactsTableClient,
  type ContactsTableClientProps,
} from './ContactsTableClient';

export type ContactsTableProps = ContactsTableClientProps;

export function ContactsTable(props: ContactsTableProps) {
  return <ContactsTableClient {...props} />;
}
