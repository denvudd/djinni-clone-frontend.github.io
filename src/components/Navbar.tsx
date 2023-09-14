import React from 'react';
import Link from 'next/link';

import { getAuthServerSession } from '@/lib/next-auth';
import { redirect } from 'next/navigation';

import { Icons } from './ui/Icons';
import UserAccountNav from './UserAccountNav';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/Button';

interface NavbarProps {
  isUserFilled: boolean;
}

const Navbar: React.FC<NavbarProps> = async ({ isUserFilled = false }) => {
  const session = await getAuthServerSession();

  if (!session) return redirect('/login');

  console.log(session);

  return (
    <header className="w-full bg-gray-100 dark:bg-dark mb-12">
      <div className="w-full min-h-[50px] container mx-auto py-2">
        <nav className="min-w-[86px] min-h-[32px] h-full flex items-center justify-between">
          <div className="flex items-center justify-between gap-3">
            <Link href="/" className="min-w-[86px] min-h-[25px]">
              <Icons.logo className="fill-black dark:fill-white" />
            </Link>
            {isUserFilled && (
              <ul className="flex gap-4 dark:text-gray-400 text-gray-dark font-semibold">
                <li>
                  <Link href="">Пропозиції</Link>
                </li>
                <li>
                  <Link href="">Вакансії</Link>
                </li>
                <li>
                  <Link href="">Зарплати</Link>
                </li>
              </ul>
            )}
          </div>
          {session.user ? (
            isUserFilled && (
              <UserAccountNav
                user={{
                  fullname: session.user.fullname,
                  avatar: session.user.avatar,
                  role: session.user.role,
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
                        'rounded-full text-white border-gray-300 px-3 py-0 text-sm leading-loose',
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
                        'rounded-full text-white border-gray-300 px-3 py-0 text-sm leading-loose',
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
