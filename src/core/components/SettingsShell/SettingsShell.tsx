import { getTranslations } from 'next-intl/server';
import type { ReactNode } from 'react';
import { PageTabs } from './PageTabs';
import { SETTINGS_TABS } from './settings.config';

export async function SettingsShell({ children }: { children: ReactNode }) {
  const t = await getTranslations('settings');

  const tabs = SETTINGS_TABS.map((tab) => ({
    ...tab,
    label: t(`tabs.${tab.key}`),
  }));

  return (
    <div className="flex flex-col gap-6">
      <PageTabs tabs={tabs} />
      {children}
    </div>
  );
}

export default SettingsShell;
