import React from 'react';
import Link from 'next/link';

import { getAuthServerSession } from '@/lib/next-auth';

import UserAccountNav from './UserAccountNav';
import { buttonVariants } from './ui/Button';
import { Icons } from './ui/Icons';

import { cn } from '@/lib/utils';
import { candidateMenu, employerMenu } from '@/config/menu';
import { UserRole } from '@/lib/enums';

const Navbar: React.FC = async () => {
  const session = await getAuthServerSession();

  console.log(session?.user);

  return (
    <header className="dark:bg-dark mb-12 w-full bg-gray-100">
      <div className="container mx-auto min-h-[50px] w-full py-2">
        <nav className="flex h-full min-h-[32px] min-w-[86px] items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="min-h-[25px] min-w-[86px]">
              <Icons.Logo className="fill-black dark:fill-white" />
            </Link>
            {session?.user?.filled && (
              <ul className="text-gray-dark flex gap-4 font-semibold dark:text-gray-400">
                {session?.user?.role === UserRole.Candidate &&
                  candidateMenu.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href}>{link.title}</Link>
                    </li>
                  ))}
                {session?.user?.role === UserRole.Employer &&
                  employerMenu.map((link) => (
                    <li key={link.title}>
                      <Link href={link.href}>{link.title}</Link>
                    </li>
                  ))}
              </ul>
            )}
          </div>
          {session?.user ? (
            session?.user?.filled && (
              <UserAccountNav
                user={{
                  fullname: session?.user?.fullname,
                  avatar: session?.user?.avatar,
                  role: session?.user?.role,
                  filled: session?.user?.filled,
                }}
              />
            )
          ) : (
            <ul className="flex gap-2">
              <li>
                <Link
                  href="/login"
                  className={cn(
                    buttonVariants({
                      variant: 'outline',
                      className:
                        'rounded-full dark:text-white border-gray-300 px-3 py-0 text-sm leading-loose',
                    }),
                  )}
                >
                  Увійти
                </Link>
              </li>
              <li>
                <Link
                  href="/signup"
                  className={cn(
                    buttonVariants({
                      variant: 'outline',
                      className:
                        'rounded-full dark:text-white border-gray-300 px-3 py-0 text-sm leading-loose',
                    }),
                  )}
                >
                  Зареєструватись
                </Link>
              </li>
            </ul>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
