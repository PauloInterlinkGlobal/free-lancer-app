const dateFormatter = new Intl.DateTimeFormat('pt-PT', {
  day: '2-digit',
  month: '2-digit',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  timeZone: 'Africa/Luanda',
});

export const formatApiDate = (iso: string | null, fallback = '—') =>
  iso ? dateFormatter.format(new Date(iso)) : fallback;
