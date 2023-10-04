/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Session, User } from 'next-auth';

import { JWT } from 'next-auth/jwt';
import type { UserRole } from '@/lib/enums';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    avatar: string | null;
    role: UserRole;
    candidate_id?: string;
    employer_id?: string;
    fullname: string | null;
    filled: boolean;
  }
  interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}
