import React from 'react';
import Image from 'next/image';

import { Avatar, AvatarFallback } from './ui/Avatar';
import { Icons } from './ui/Icons';

import { type User } from 'next-auth';
import type { AvatarProps } from '@radix-ui/react-avatar';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'fullname' | 'avatar'>;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  return (
    <Avatar {...props}>
      {user.avatar ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.avatar}
            alt="Profile picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user.fullname}</span>
          <Icons.user />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
