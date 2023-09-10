import type { Session, User } from 'next-auth';

declare module 'next-auth' {
  interface Session {
    user: User & {
      id: UserId;
      username?: string | null;
    };
  }
}
