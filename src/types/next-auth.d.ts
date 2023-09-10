import type { UserRole } from '@/lib/enums';
import type { Session } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    avatar: string;
    role: UserRole;
  }
  interface Session {
    user: User;

    accessToken: string;
    refreshToken: string;
  }
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;

    accessToken: string;
    refreshToken: string;
  }
}
