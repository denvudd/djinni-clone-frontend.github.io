import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';
import { Icons } from '@/components/ui/Icons';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <header className="w-full bg-gray-100 dark:bg-dark mb-12">
        <div className="w-full min-h-[50px] container mx-auto flex justify-between items-center py-2">
          <nav className="min-w-[86px] min-h-[25px]">
            <Link href="/" className="min-w-[86px] min-h-[25px]">
              <Icons.logo className="fill-black dark:fill-white" />
            </Link>
          </nav>
        </div>
      </header>
      <main>
        <div className="container">{children}</div>
      </main>
      <Footer />
    </>
  );
};

export default AuthLayout;
