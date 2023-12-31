'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';

import { buttonVariants } from './ui/Button';
import { cn } from '@/lib/utils';
import UserAvatar from './UserAvatar';

const SignInButton: React.FC = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <ul className="flex">
        <UserAvatar user={session.user} />
        <p>{session.user.email}</p>
        <li>
          <Link
            href="/api/auth/signout"
            className={buttonVariants({
              variant: 'outline',
              className: cn(
                'rounded-full border-gray-400 px-3 py-0 text-sm leading-loose text-white',
              ),
            })}
          >
            Вийти
          </Link>
        </li>
      </ul>
    );
  }
  return (
    <ul className="flex gap-2">
      <li>
        <Link
          href="/login"
          className={cn(
            buttonVariants({
              variant: 'outline',
              className: 'rounded-full text-white border-gray-300 px-3 py-0 text-sm leading-loose',
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
              className: 'rounded-full text-white border-gray-300 px-3 py-0 text-sm leading-loose',
            }),
          )}
        >
          Зареєструватись
        </Link>
      </li>
    </ul>
  );
};

export default SignInButton;
