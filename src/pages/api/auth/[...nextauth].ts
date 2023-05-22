import type { NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { AuthRoutes, Routes } from '@/helpers/routes';
import { userController } from '@/lib/dependencies';
import { type UserLogin, UserSchema } from '@/schemas/user.schema';
import { signJwtAccessToken } from '@/lib/security/jwt';
import { dbConnect } from '@/utils/mongoose';

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  // Do whatever you want here, before the request is passed down to `NextAuth`

  dbConnect();

  const maxAge = 60 * 60 * 4; // 4 hours

  const options: NextAuthOptions = {
    providers: [
      CredentialsProvider({
        id: 'credentials',
        name: 'Credentials',
        credentials: {
          username: { label: 'Username', type: 'text' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          return userController.login(credentials as UserLogin);
        },
      }),
    ],
    callbacks: {
      async jwt({ token, user }) {
        if (user instanceof UserSchema) {
          const accessToken = signJwtAccessToken({ sub: user.username });
          return { tokenType: 'Bearer', accessToken, user };
        }
        return token;
      },
      async session({ session, token }) {
        session.token = token.accessToken;
        session.user = token.user;
        return session;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
    session: {
      strategy: 'jwt',
      maxAge,
    },
    jwt: {
      secret: process.env.NEXTAUTH_SECRET,
      maxAge,
    },
    pages: {
      signIn: AuthRoutes.SIGN_IN.path,
      error: AuthRoutes.SIGN_IN.path,
      newUser: AuthRoutes.SIGN_UP.path,
      signOut: Routes.HOME.path,
    },
  };

  return NextAuth(req, res, options);
}
