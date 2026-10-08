import { Header } from '@/core/components/Header';
import { NavigationProgress } from '@/core/components/Loading/NavigationProgress';
import { Sidebar } from '@/core/components/SideBar/index';
import Toaster from '@/core/toasters/Toaster';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <NavigationProgress />
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />
        <Toaster />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="flex flex-col gap-6">{children}</div>
        </main>
      </div>
    </div>
  );
}
