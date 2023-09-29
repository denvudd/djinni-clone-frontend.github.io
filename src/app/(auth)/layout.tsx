import React from 'react';

import Link from 'next/link';
import Footer from '@/components/Footer';
import { Icons } from '@/components/ui/Icons';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => (
  <>
    <header className="dark:bg-dark mb-12 w-full bg-gray-100">
      <div className="container mx-auto flex min-h-[50px] w-full items-center justify-between py-2">
        <nav className="min-h-[25px] min-w-[86px]">
          <Link href="/" className="min-h-[25px] min-w-[86px]">
            <Icons.Logo className="fill-black dark:fill-white" />
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

export default AuthLayout;
