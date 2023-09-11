import React from 'react';

import Image from 'next/image';
import Link from 'next/link';
import Footer from '@/components/Footer';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <>
      <header className="w-full bg-dark mb-12">
        <div className="w-full min-h-[50px] container mx-auto flex justify-between items-center py-2">
          <nav className="min-w-[86px] min-h-[25px]">
            <Link href="/" className="min-w-[86px] min-h-[25px]">
              <Image src="/logo.svg" alt="Djinni logo" width={86} height={25} />
            </Link>
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default AuthLayout;
