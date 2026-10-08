import { ThemeProvider } from '@/core/components/ThemeProvider/ThemeProvider';
import { Toaster } from '@/core/toasters';
import type { Metadata, Viewport } from 'next';
import { Poppins } from 'next/font/google';
import './globals.css';

const poppins = Poppins({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
});

export const viewport: Viewport = {
  themeColor: '#004ac6',
  width: 'device-width',
  initialScale: 1,
  minimumScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://app.smsillico.ao'),
  title: 'Smsillico - Plataforma de SMS e Comunicação',
  description:
    'Smsillico é uma plataforma de SMS e comunicação que oferece soluções eficientes para empresas e indivíduos. Com Smsillico, você pode enviar mensagens de texto em massa, automatizar notificações e muito mais, tudo de forma rápida e confiável.',
  keywords: [
    'Smsillico',
    'SMS',
    'comunicação',
    'mensagens de texto',
    'marketing',
    'notificações',
    'plataforma de SMS',
    'envio em massa',
    'automação de mensagens',
    'soluções de comunicação',
  ],
  authors: [{ name: 'Smsillico' }],
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Smsillico - Plataforma de SMS e Comunicação',
    description:
      'Smsillico é uma plataforma de SMS e comunicação que oferece soluções eficientes para empresas e indivíduos. Com Smsillico, você pode enviar mensagens de texto em massa, automatizar notificações e muito mais, tudo de forma rápida e confiável.',
    url: 'https://app.smsillico.ao',
    siteName: 'Smsillico',
    images: [
      {
        url: 'https://app.smsillico.ao/images/smsillico.jpg',
        width: 1200,
        height: 630,
        alt: 'Smsillico - Plataforma de SMS e Comunicação',
      },
    ],
    locale: 'pt_AO',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Smsillico - Plataforma de SMS e Comunicação',
    description:
      'Smsillico é uma plataforma de SMS e comunicação que oferece soluções eficientes para empresas e indivíduos. Com Smsillico, você pode enviar mensagens de texto em massa, automatizar notificações e muito mais, tudo de forma rápida e confiável.',
    images: ['https://app.smsillico.ao/images/smsillico.jpg'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt" className="min-h-screen" suppressHydrationWarning>
      <body
        className={`${poppins.variable} font-sans antialiased selection:bg-primary selection:text-white min-h-screen`}
        suppressHydrationWarning
      >
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
