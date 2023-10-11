'use client';

import React from 'react';
import Link from 'next/link';
import { signOut } from 'next-auth/react';

import { type User } from 'next-auth';
import { ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from '@/components/ui/DropdownMenu';
import UserAvatar from './UserAvatar';

import { candidateUserMenu, employerUserMenu } from '@/config/menu';
import { UserRole } from '@/lib/enums';

interface UserAccountNavProps {
  user: Pick<User, 'fullname' | 'avatar' | 'role' | 'filled'>;
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => (
  <DropdownMenu modal={false}>
    <DropdownMenuTrigger className="mt-6 md:mt-0">
      <div className="flex items-center">
        {user.filled ? (
          <span className="bg-green order-last ml-2 mr-1 rounded-full px-2 py-1 text-xs font-bold text-white md:order-first md:ml-0">
            online
          </span>
        ) : (
          <span className="bg-danger mr-1 rounded-full px-2 py-1 text-xs font-bold text-white">
            Не заповнений профіль
          </span>
        )}

        <UserAvatar
          user={{
            avatar: user.avatar ?? null,
            fullname: user.fullname ?? null,
          }}
          className="mr-2 h-8 w-8"
        />
        <span className="text-gray-dark font-semibold dark:text-gray-400">{user.fullname}</span>
        <ChevronDown className="ml-3 h-4 w-4" />
      </div>
    </DropdownMenuTrigger>
    <DropdownMenuContent className="overflow-y-scroll bg-white" align="end">
      {user.role === UserRole.Candidate &&
        candidateUserMenu.map((link) => (
          <DropdownMenuItem key={link.title} asChild>
            <Link href={link.href}>
              <span className="text-dark-gray text-base">{link.title}</span>
            </Link>
          </DropdownMenuItem>
        ))}

      {user.role === UserRole.Employer &&
        employerUserMenu.map((link) => (
          <DropdownMenuItem key={link.title} asChild>
            <Link href={link.href}>
              <span className="text-dark-gray text-base">{link.title}</span>
            </Link>
          </DropdownMenuItem>
        ))}

      <DropdownMenuSeparator />

      <DropdownMenuItem
        className="cursor-pointer"
        onSelect={async (event) => {
          event.preventDefault();
          await signOut({
            callbackUrl: `${window.location.origin}/`,
          });
        }}
      >
        <span className="text-dark-gray text-base">Вийти</span>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href="/r/create" className="cursor-pointer">
          <span className="text-dark-gray text-base">
            Профіль {user.role === UserRole.Candidate ? 'кандидата' : 'роботодавця'}
          </span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href="/r/create" className="text-dark-gray cursor-pointer text-base">
          <span className="text-dark-gray text-base">Запропонувати ідею</span>
        </Link>
      </DropdownMenuItem>

      <DropdownMenuItem asChild>
        <Link href="/r/create" className="cursor-pointer">
          <span className="text-dark-gray text-base">Авто-тема</span>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
);

export default UserAccountNav;
