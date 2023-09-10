import Providers from '@/components/providers/Providers';
import { Inter } from 'next/font/google';
import type { Metadata } from 'next';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Джин для пошуку роботи',
    template: `%s - Джинні`,
  },
  description:
    'Вакансії в українському ІТ і ремоут, анонімний пошук роботи для розробників.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ua">
      <body className={inter.className + ' antialiased bg-white text-zinc-900'}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
