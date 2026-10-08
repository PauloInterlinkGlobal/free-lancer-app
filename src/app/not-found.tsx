import { getLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
export default async function NotFound() {
  const locale = await getLocale();
  const t = await getTranslations('NotFound');

  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[var(--background)] text-[rgb(var(--color-text-primary))]">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-40 top-1/4 h-[28rem] w-[28rem] rounded-full bg-[rgb(var(--color-primary)/0.14)] blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 bottom-0 h-[28rem] w-[28rem] rounded-full bg-[rgb(var(--color-chart-line-secondary)/0.14)] blur-3xl"
      />

      <section className="relative flex flex-1 flex-col items-center justify-center px-6 pb-24 text-center">
        <p
          aria-hidden
          className="select-none bg-gradient-to-r from-[rgb(var(--color-primary))] to-[rgb(var(--color-chart-line-secondary))] bg-clip-text text-[9rem] font-black leading-none tracking-tighter text-transparent sm:text-[14rem]"
        >
          404
        </p>

        <h1 className="mt-2 text-2xl font-bold sm:text-4xl">{t('title')}</h1>

        <p className="mt-4 max-w-md text-base text-[rgb(var(--color-text-secondary))]">
          {t('description')}
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <Link
            href={`/${locale}/dashboard`}
            className="rounded-full bg-[rgb(var(--color-primary))] px-8 py-3 text-sm font-semibold text-white transition hover:opacity-90 dark:text-[#0d1117]"
          >
            {t('goDashboard')}
          </Link>
          <Link
            href={`/${locale}/login`}
            className="text-sm font-semibold text-[rgb(var(--color-text-secondary))] underline-offset-4 transition hover:text-[rgb(var(--color-primary))] hover:underline"
          >
            {t('goLogin')}
          </Link>
        </div>
      </section>
    </main>
  );
}
