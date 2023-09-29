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
    <header className="w-full bg-gray-100 dark:bg-dark mb-12">
      <div className="w-full min-h-[50px] container mx-auto py-2">
        <nav className="min-w-[86px] min-h-[32px] h-full flex items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="min-w-[86px] min-h-[25px]">
              <Icons.Logo className="fill-black dark:fill-white" />
            </Link>
            {session?.user?.filled && (
              <ul className="flex gap-4 dark:text-gray-400 text-gray-dark font-semibold">
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
