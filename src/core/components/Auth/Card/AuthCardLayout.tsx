import { Logo } from '@/core/components/Logo';
import { ReactNode } from 'react';
import AuthFooter from '../Footer/AuthFooter';
import CardProgressBar from './CardProgressBar';

interface AuthCardLayoutProps {
  isLoading: boolean;
  leftColumn: ReactNode;
  rightColumn: ReactNode;
}

export default function AuthCardLayout({
  isLoading,
  leftColumn,
  rightColumn,
}: AuthCardLayoutProps) {
  return (
    <main
      suppressHydrationWarning
      className="relative flex min-h-screen flex-col items-center justify-center overflow-x-hidden bg-white-100 dark:bg-[#0a0f1d] px-4 py-8 antialiased selection:bg-primary-500 selection:text-white transition-colors duration-200"
    >
      <div
        className="pointer-events-none absolute -top-40 -left-40 h-[500px] w-[500px] rounded-full bg-blue-500/10 dark:bg-blue-600/10 blur-[120px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute top-1/2 -right-40 h-[500px] w-[500px] rounded-full bg-indigo-500/10 dark:bg-indigo-600/10 blur-[130px]"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-32 left-1/3 h-[450px] w-[450px] rounded-full bg-blue-400/10 dark:bg-blue-500/10 blur-[120px]"
        aria-hidden="true"
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] bg-[radial-gradient(#000000_1.5px,transparent_1.5px)] dark:bg-[radial-gradient(#ffffff_1.5px,transparent_1.5px)] [background-size:24px_24px]"
        aria-hidden="true"
      />

      <div
        suppressHydrationWarning
        className="relative z-10 w-full max-w-4xl overflow-hidden rounded-[24px] sm:rounded-[28px] border border-neutral-200/80 dark:border-slate-700/60 bg-white dark:bg-[#111c30] shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_25px_70px_rgba(0,0,0,0.6)] transition-colors duration-200"
      >
        <CardProgressBar isLoading={isLoading} />

        <div
          suppressHydrationWarning
          className="grid grid-cols-1 md:grid-cols-2 min-h-[540px]"
        >
          <div
            suppressHydrationWarning
            className="relative hidden flex-col justify-between overflow-hidden bg-primary dark:bg-[#0d1526] p-8 sm:p-10 md:flex"
          >
            <div className="relative z-10">
              <Logo
                size="md"
                className="h-10 sm:h-11 w-auto brightness-110 drop-shadow"
              />
            </div>

            <div className="relative z-10 my-auto py-6">
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white leading-snug">
                Envie SMS com alta taxa de entrega e velocidade recorde.
              </h2>
              <p className="mt-4 text-xs sm:text-sm leading-relaxed text-white">
                Mais de 10.000 mensagens entregues por minuto com relatórios
                instantâneos e integração simples para a sua empresa.
              </p>
            </div>
          </div>

          <div
            suppressHydrationWarning
            className="flex flex-col justify-between bg-white dark:bg-[#0f172a] p-8 sm:p-10 md:p-11 text-neutral-900 dark:text-neutral-100 transition-colors duration-200"
          >
            <div className="mb-4 flex items-center justify-between md:hidden">
              <Logo size="md" className="h-10 w-auto" />
            </div>

            <div className="my-auto flex flex-col justify-center gap-6">
              <div suppressHydrationWarning className="flex flex-col">
                {leftColumn}
              </div>

              <div suppressHydrationWarning className="flex flex-col">
                {rightColumn}
              </div>
            </div>
          </div>
        </div>
      </div>

      <AuthFooter />
    </main>
  );
}
