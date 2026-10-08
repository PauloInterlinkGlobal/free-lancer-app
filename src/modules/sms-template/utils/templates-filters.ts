import { ITemplate, TemplatesFiltersValue } from '../interfaces/templates';

export function parseTemplatesFilters(
  raw: Record<string, string | string[] | undefined>
): TemplatesFiltersValue {
  const get = (key: string) => {
    const val = raw[key];
    return Array.isArray(val) ? val[0] : val;
  };

  return {
    search: get('search') ?? '',
    category: get('category') ?? '',
    sortBy: (get('sortBy') as TemplatesFiltersValue['sortBy']) ?? 'recent',
    page: Math.max(1, parseInt(get('page') ?? '1', 10)),
  };
}

export function filterTemplates(
  templates: ITemplate[],
  filters: TemplatesFiltersValue
): ITemplate[] {
  let result = [...templates];

  if (filters.search) {
    const query = filters.search.toLowerCase().trim();
    result = result.filter(
      (t) =>
        t.title.toLowerCase().includes(query) ||
        t.content.toLowerCase().includes(query)
    );
  }

  if (filters.category) {
    result = result.filter((t) => t.category === filters.category);
  }

  if (filters.sortBy === 'name') {
    result.sort((a, b) => a.title.localeCompare(b.title));
  } else if (filters.sortBy === 'variables') {
    result.sort((a, b) => b.variablesCount - a.variablesCount);
  } else {
    // recent
    result.sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }

  return result;
}

export function extractVariables(content: string): string[] {
  const matches = content.match(/\{\{([^}]+)\}\}/g);
  if (!matches) return [];
  return Array.from(new Set(matches.map((m) => m.replace(/[{}]/g, '').trim())));
}
