import { Inter } from 'next/font/google';
import type { Metadata } from 'next';
import Providers from '@/components/providers/Providers';

import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    default: 'Джин для пошуку роботи',
    template: '%s - Джинні',
  },
  description: 'Вакансії в українському ІТ і ремоут, анонімний пошук роботи для розробників.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="uk">
      <body
        className={`${inter.className} dark:bg-gray-dark text-dark flex h-full flex-col bg-white antialiased dark:text-[#adb5bd]`}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
