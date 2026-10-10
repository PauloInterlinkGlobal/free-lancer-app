export const SETTINGS_TABS = [
  { key: 'general', href: '/settings/general' },
  { key: 'security', href: '/settings/security' },
  { key: 'team', href: '/settings/team' },
  { key: 'preferences', href: '/settings/preferences' },
] as const;

export type SettingsTabKey = (typeof SETTINGS_TABS)[number]['key'];
