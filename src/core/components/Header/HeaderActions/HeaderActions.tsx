'use client';

import { HeaderNotifications } from '@/core/components/Header/HeaderNotifications/HeaderNotifications';
import { HeaderWallet } from '@/core/components/Header/HeaderWallet/HeaderWallet';
import { UserDropdown } from '@/core/components/Header/UserDropdown';

export function HeaderActions() {
  const user = { name: 'John Doe', role: 'Admin' };

  async function handleLogout() {
    console.log('Logging out...');
  }

  return (
    <div className="flex items-center gap-3">
      <HeaderWallet />
      <HeaderNotifications />

      <div className="w-px h-5 bg-border-ui" />

      <UserDropdown name={user.name} role={user.role} onLogout={handleLogout} />
    </div>
  );
}
