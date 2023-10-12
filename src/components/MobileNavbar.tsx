'use client';

import React from 'react';
import Link from 'next/link';

import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useIsComponentMounted } from '@/hooks/use-is-component-mounted';

import { Sheet, SheetContent, SheetTrigger } from './ui/Sheet';
import UserAccountNav from './UserAccountNav';
import { buttonVariants } from './ui/Button';

import { candidateMenu, employerMenu } from '@/config/menu';
import { UserRole } from '@/lib/enums';
import { cn } from '@/lib/utils';

interface MobileNavbarProps {
  userFilled: boolean | undefined;
  userRole: UserRole | undefined;
  avatar: string | null | undefined;
  fullname: string | null | undefined;
}

const MobileNavbar: React.FC<MobileNavbarProps> = ({ avatar, fullname, userFilled, userRole }) => {
  const pathname = usePathname();
  const { isMounted } = useIsComponentMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="border-gray rounded-md border p-1">
          <Menu className="h-7 w-10 text-black" />
        </button>
      </SheetTrigger>
      <SheetContent side="top" className="h-auto">
        {userFilled && (
          <ul className="text-gray flex flex-col gap-4 font-semibold">
            {userRole === UserRole.Candidate &&
              candidateMenu.map((link) => (
                <li
                  key={link.title}
                  className={cn({
                    'text-gray-dark': pathname === link.href,
                  })}
                >
                  <Link href={link.href}>{link.title}</Link>
                </li>
              ))}
            {userRole === UserRole.Employer &&
              employerMenu.map((link) => (
                <li
                  key={link.title}
                  className={cn({
                    'text-gray-dark': pathname === link.href,
                  })}
                >
                  <Link href={link.href}>{link.title}</Link>
                </li>
              ))}
          </ul>
        )}
        {userFilled ? (
          <UserAccountNav
            user={{
              fullname: fullname!,
              avatar: avatar!,
              role: userRole!,
              filled: userFilled,
            }}
          />
        ) : (
          <ul className="mt-8 flex gap-2 md:mt-0">
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
      </SheetContent>
    </Sheet>
  );
};

export default MobileNavbar;
