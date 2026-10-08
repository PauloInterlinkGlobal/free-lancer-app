export interface FilePreview {
  headers: string[];
  rows: string[][];
  totalRows: number;
}

function detectDelimiter(firstLine: string) {
  const candidates = [';', ',', '\t'];
  return candidates
    .map((d) => ({ d, count: firstLine.split(d).length }))
    .sort((a, b) => b.count - a.count)[0].d;
}

function parseCsv(text: string): string[][] {
  const clean = text.replace(/^\uFEFF/, '');
  const delimiter = detectDelimiter(clean.split(/\r?\n/)[0] ?? '');

  const rows: string[][] = [];
  let row: string[] = [];
  let cell = '';
  let inQuotes = false;

  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];

    if (inQuotes) {
      if (char === '"' && clean[i + 1] === '"') {
        cell += '"';
        i++;
      } else if (char === '"') {
        inQuotes = false;
      } else {
        cell += char;
      }
      continue;
    }

    if (char === '"') inQuotes = true;
    else if (char === delimiter) {
      row.push(cell);
      cell = '';
    } else if (char === '\n' || char === '\r') {
      if (char === '\r' && clean[i + 1] === '\n') i++;
      row.push(cell);
      cell = '';
      rows.push(row);
      row = [];
    } else {
      cell += char;
    }
  }

  if (cell !== '' || row.length > 0) {
    row.push(cell);
    rows.push(row);
  }

  return rows.filter((r) => r.some((c) => c.trim() !== ''));
}

async function parseSpreadsheet(file: File): Promise<string[][]> {
  const XLSX = await import('xlsx');

  const workbook = XLSX.read(await file.arrayBuffer(), { type: 'array' });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  if (!sheet) return [];

  const matrix = XLSX.utils.sheet_to_json<unknown[]>(sheet, {
    header: 1,
    raw: false,
    defval: '',
    blankrows: false,
  });

  return matrix.map((row) => row.map((cell) => String(cell ?? '')));
}

export async function readFilePreview(
  file: File,
  maxRows = 10
): Promise<FilePreview> {
  const isCsv = file.name.toLowerCase().endsWith('.csv');

  const matrix = isCsv
    ? parseCsv(await file.text())
    : await parseSpreadsheet(file);
  if (matrix.length === 0) throw new Error('O ficheiro está vazio.');

  const [headerRow, ...dataRows] = matrix;
  const columnCount = Math.max(
    headerRow.length,
    ...dataRows.map((row) => row.length)
  );

  const headers = Array.from({ length: columnCount }, (_, i) => {
    const name = (headerRow[i] ?? '').trim();
    return name || `Coluna ${i + 1}`;
  });

  const rows = dataRows
    .slice(0, maxRows)
    .map((row) =>
      Array.from({ length: columnCount }, (_, i) => (row[i] ?? '').trim())
    );

  return { headers, rows, totalRows: dataRows.length };
}
