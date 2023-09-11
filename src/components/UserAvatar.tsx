import React from 'react';
import { Avatar, AvatarFallback } from './ui/Avatar';
import Image from 'next/image';
import { Icons } from './ui/Icons';
import type { AvatarProps } from '@radix-ui/react-avatar';
import { UserRole } from '@/lib/enums';
import { User } from 'next-auth';

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, 'email' | 'role' | 'avatar'>;
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
          <span className="sr-only">{user.email}</span>
          <Icons.user />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
