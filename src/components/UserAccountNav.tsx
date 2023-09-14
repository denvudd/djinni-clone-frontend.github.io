'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import UserAvatar from './UserAvatar';
import { type User } from 'next-auth';
import { ChevronDown } from 'lucide-react';

interface UserAccountNavProps {
  user: Pick<User, 'fullname' | 'avatar' | 'role'>;
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center">
          <span className="rounded-full bg-green text-white text-xs font-bold py-1 px-2 mr-1">
            online
          </span>
          <UserAvatar
            user={{
              avatar: user.avatar || null,
              fullname: user.fullname || null,
            }}
            className="h-8 w-8"
          />
          <span className="font-semibold dark:text-gray-400 text-gray-dark">
            Дмитро Юрін
          </span>
          <ChevronDown className="ml-3 w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        <DropdownMenuItem asChild>
          <Link href="/" className="cursor-pointer">
            Мій профіль
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
          }}
        >
          Вийти
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/r/create" className="cursor-pointer">
            Профіль {user.role === 'Candidate' ? 'кандидата' : 'роботодавця'}
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/r/create" className="cursor-pointer">
            Запропонувати ідею
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link href="/r/create" className="cursor-pointer">
            Авто-тема
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserAccountNav;
