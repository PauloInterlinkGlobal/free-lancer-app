export const SETTINGS_TABS = [
  { key: 'general', href: '/settings/general' },
  { key: 'project', href: '/settings/project' },
  { key: 'team', href: '/settings/team' },
  { key: 'preferences', href: '/settings/preferences' },
  { key: 'security', href: '/settings/security' },
] as const;

export type SettingsTabKey = (typeof SETTINGS_TABS)[number]['key'];
