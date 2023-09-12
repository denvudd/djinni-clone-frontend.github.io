import type { UserRole } from '@/lib/enums';
import type { Session } from 'next-auth';

declare module 'next-auth' {
  interface User {
    id: string;
    email: string;
    avatar: string | null;
    role: UserRole;
    candidate_id?: string;
    employer_id?: string;
    fullname: string | null;
  }
  interface Session {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}

import { JWT } from 'next-auth/jwt';

declare module 'next-auth/jwt' {
  interface JWT {
    user: User;
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  }
}
