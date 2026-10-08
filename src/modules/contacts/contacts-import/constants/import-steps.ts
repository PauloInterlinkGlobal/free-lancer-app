export const IMPORT_STEPS = [
  { id: 'upload', label: 'Upload' },
  { id: 'mapping', label: 'Mapeamento' },
  { id: 'review', label: 'Revisão' },
] as const;

export const MAX_CUSTOM_VARIABLES = 10;
export const MAX_FILE_SIZE_MB = 10;
export const ACCEPTED_EXTENSIONS = ['csv', 'xlsx'];

export const IMPORT_FIELDS = [
  { id: 'name', label: 'Nome', required: true },
  { id: 'surname', label: 'Apelido', required: false, builtIn: true },
  { id: 'phone', label: 'Telemóvel', required: true },
  { id: 'email', label: 'Email', required: false },
  { id: 'city', label: 'Cidade', required: false },
] as const;
