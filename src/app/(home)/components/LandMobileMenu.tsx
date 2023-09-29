'use client';

import React from 'react';
import Link from 'next/link';

import { Menu } from 'lucide-react';
import { SheetTrigger, SheetContent, Sheet } from '@/components/ui/Sheet';
import { useIsComponentMounted } from '@/hooks/use-is-component-mounted';
import { buttonVariants } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

const LandMobileMenu: React.FC = () => {
  const { isMounted } = useIsComponentMounted();

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <button className="rounded-md border border-stone-400 p-1">
          <Menu className="h-7 w-10 text-white" />
        </button>
      </SheetTrigger>
      <SheetContent side="top">
        <nav className="flex justify-center py-7">
          <ul className="flex gap-2">
            <li>
              <Link
                href="/login"
                className={buttonVariants({
                  variant: 'outline',
                  className: cn('rounded-full border-gray-400 px-3 py-0 text-sm leading-loose'),
                })}
              >
                Увійти
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className={buttonVariants({
                  variant: 'outline',
                  className: cn('rounded-full border-gray-400 px-3 py-1 text-sm'),
                })}
              >
                Зареєструватись
              </Link>
            </li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  );
};

export default LandMobileMenu;
