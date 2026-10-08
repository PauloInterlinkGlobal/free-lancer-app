'use client';

import { UserDropdown } from '@/core/components/Header/UserDropdown';
import { Bell } from 'lucide-react';

export function HeaderActions() {
  const user = { name: 'John Doe', role: 'Admin' };

  async function handleLogout() {
    console.log('Logging out...');
  }

  return (
    <div className="flex items-center gap-3">
      <button className="relative w-9 h-9 flex items-center justify-center rounded-xl hover:bg-item-hover transition-colors">
        <Bell className="w-5 h-5 text-text-secondary" />
        <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-secondary-400 rounded-full" />
      </button>

      <div className="w-px h-5 bg-border-ui" />

      <UserDropdown name={user.name} role={user.role} onLogout={handleLogout} />
    </div>
  );
}
