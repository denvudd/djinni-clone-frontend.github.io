import { NextAuthOptions, User } from 'next-auth';
import { JWT } from 'next-auth/jwt';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

async function refreshToken(token: JWT): Promise<JWT> {
  const res = await fetch(`${process.env.BACKEND_API_URL}/auth/refresh`, {
    method: 'POST',
    headers: {
      authorization: `Refresh ${token.refreshToken}`,
    },
  });

  const response = (await res.json()) as Pick<JWT, 'accessToken' | 'refreshToken'>;

  return {
    ...token,
    accessToken: response.accessToken,
    refreshToken: response.refreshToken,
  };
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: {
          label: 'Username',
          type: 'text',
          placeholder: 'John Smith',
        },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username || !credentials?.password) return null;

        const { username, password } = credentials;

        const res = await fetch(`${process.env.BACKEND_API_URL}/auth/login`, {
          method: 'POST',
          body: JSON.stringify({
            username,
            password,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.status === 401) {
          console.log(res.statusText);

          throw Error(res.status.toString());
        }

        const user = await res.json();

        return user as User;
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user: User;
      trigger?: 'signIn' | 'signUp' | 'update' | undefined;
      session?: { filled?: boolean; avatar?: string };
    }) {
      session as { filled: boolean };
      if (trigger === 'update' && session?.filled) {
        token.user.filled = session.filled;
      }

      if (
        trigger === 'update' &&
        (session?.avatar === null || typeof session?.avatar === 'string')
      ) {
        token.user.avatar = session.avatar;
      }

      if (user) {
        return {
          ...token,
          ...user,
        };
      }

      if (new Date().getTime() < token.expiresIn) return token; // check if token is expired

      return refreshToken(token);
    },
    async session({ token, session }) {
      session.user = token.user;
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;

      return session;
    },
  },
  pages: {
    signIn: '/login',
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
