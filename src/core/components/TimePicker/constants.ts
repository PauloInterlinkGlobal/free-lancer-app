export const HOURS = Array.from({ length: 24 }, (_, i) =>
  String(i).padStart(2, '0')
);

export const MINUTES_15 = ['00', '15', '30', '45'];

export const MINUTES_5 = [
  '00',
  '05',
  '10',
  '15',
  '20',
  '25',
  '30',
  '35',
  '40',
  '45',
  '50',
  '55',
];

export const TIME_PRESETS = ['09:00', '14:00', '18:00'];
