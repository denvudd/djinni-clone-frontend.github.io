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

import { candidateUserMenu, employerUserMenu } from '@/config/menu';

interface UserAccountNavProps {
  user: Pick<User, 'fullname' | 'avatar' | 'role' | 'filled'>;
}

const UserAccountNav: React.FC<UserAccountNavProps> = ({ user }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center">
          {user.filled ? (
            <span className="rounded-full bg-green text-white text-xs font-bold py-1 px-2 mr-1">
              online
            </span>
          ) : (
            <span className="rounded-full bg-danger text-white text-xs font-bold py-1 px-2 mr-1">
              Не заповнений профіль
            </span>
          )}

          <UserAvatar
            user={{
              avatar: user.avatar || null,
              fullname: user.fullname || null,
            }}
            className="h-8 w-8"
          />
          <span className="font-semibold dark:text-gray-400 text-gray-dark">
            {user.fullname}
          </span>
          <ChevronDown className="ml-3 w-4 h-4" />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="bg-white" align="end">
        {user.role === 'Candidate' &&
          candidateUserMenu.map((link) => (
            <DropdownMenuItem key={link.title} asChild>
              <Link href={link.href}>
                <span className="text-dark-gray text-base">{link.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}

        {user.role === 'Employer' &&
          employerUserMenu.map((link) => (
            <DropdownMenuItem key={link.title} asChild>
              <Link href={link.href}>
                <span className="text-dark-gray text-base">{link.title}</span>
              </Link>
            </DropdownMenuItem>
          ))}

        <DropdownMenuItem
          className="cursor-pointer"
          onSelect={(event) => {
            event.preventDefault();
            signOut({
              callbackUrl: `${window.location.origin}/`,
            });
          }}
        >
          <span className="text-dark-gray text-base">Вийти</span>
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem asChild>
          <Link href="/r/create" className="cursor-pointer">
            <span className="text-dark-gray text-base">
              Профіль {user.role === 'Candidate' ? 'кандидата' : 'роботодавця'}
            </span>
          </Link>
        </DropdownMenuItem>

        <DropdownMenuItem asChild>
          <Link
            href="/r/create"
            className="cursor-pointer text-dark-gray text-base"
          >
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
};

export default UserAccountNav;
