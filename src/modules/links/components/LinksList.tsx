// Camada 2 (servidor): filtra e pagina os dados e compõe os componentes cliente.
// Não tem estado nem handlers; as interações ficam nos componentes-folha.
import { ILink } from '../interfaces/links';
import {
  filterLinks,
  paginate,
  type LinksFiltersValue,
} from '../utils/links-filters';
import { AddLinkModal } from './Modal/AddLink/AddLinkModal';
import { DeleteLinkModal } from './Modal/DeleteLink/DeleteLinkModal';
import { LinksFilters } from './LinksFilters';
import { LinksTable } from './LinksTable';

interface LinksListProps {
  links: ILink[];
  filters: LinksFiltersValue;
}

export function LinksList({ links, filters }: LinksListProps) {
  // Ao eliminar o último item de uma página, `paginate` devolve a última página válida.
  const filtered = filterLinks(links, filters);
  const { items, currentPage, totalPages } = paginate(filtered, filters.page);

  return (
    <div className="flex flex-col gap-6">
      <LinksFilters />

      <LinksTable data={items} currentPage={currentPage} totalPages={totalPages} />

      <AddLinkModal />

      <DeleteLinkModal />
    </div>
  );
}
