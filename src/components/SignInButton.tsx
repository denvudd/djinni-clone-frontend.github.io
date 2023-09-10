'use client';

import React from 'react';
import { useSession } from 'next-auth/react';

import Link from 'next/link';

import { buttonVariants } from './ui/Button';
import { cn } from '@/lib/utils';
import UserAvatar from './UserAvatar';

interface SignInButtonProps {}

const SignInButton: React.FC<SignInButtonProps> = ({}) => {
  const { data: session } = useSession();
  console.log(session);

  if (session && session.user) {
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
                'rounded-full text-white border-gray-400 px-3 py-0 text-sm leading-loose',
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
          href="/api/auth/signin"
          className={buttonVariants({
            variant: 'outline',
            className: cn(
              'rounded-full text-white border-gray-400 px-3 py-0 text-sm leading-loose',
            ),
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
            className: cn(
              'rounded-full text-white border-gray-400 px-3 py-1 text-sm',
            ),
          })}
        >
          Зареєструватись
        </Link>
      </li>
    </ul>
  );
};

export default SignInButton;
