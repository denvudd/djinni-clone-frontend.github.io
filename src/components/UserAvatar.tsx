import React from 'react';
import Image from 'next/image';

import { type User } from 'next-auth';
import type { AvatarProps } from '@radix-ui/react-avatar';
import { Avatar, AvatarFallback } from './ui/Avatar';
import { Icons } from './ui/Icons';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'fullname' | 'avatar'>;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => (
  <Avatar {...props}>
    {user.avatar ? (
      <div className="relative aspect-square h-full w-full">
        <Image fill src={user.avatar} alt="Profile picture" referrerPolicy="no-referrer" />
      </div>
    ) : (
      <AvatarFallback>
        <span className="sr-only">{user.fullname}</span>
        <Icons.User />
      </AvatarFallback>
    )}
  </Avatar>
);

export default UserAvatar;
