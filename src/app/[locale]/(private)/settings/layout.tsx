import { SettingsShell } from '@/core/components/SettingsShell';
import type { ReactNode } from 'react';

export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <SettingsShell>{children}</SettingsShell>;
}
