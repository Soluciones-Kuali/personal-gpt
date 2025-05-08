import CredentialsProvider from 'next-auth/providers/credentials';
import type { NextAuthConfig } from 'next-auth';
import { compare } from 'bcryptjs';

import { models } from '@/utils/database';

export const authConfig: NextAuthConfig = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Correo', type: 'email' },
        password: { label: 'Contraseña', type: 'password' },
      },
      async authorize(credentials) {
        const email = credentials.email as string;
        const password = credentials.password as string;

        if (!email || !password) {
          throw new Error('Email y password son requeridos');
        }

        const user = await models.users.findOne({
          where: { email },
        });

        if (!user) {
          throw new Error('Usuario no encontrado');
        }

        const isValidPassword = await compare(
          password,
          (user.dataValues.hashed_password ?? '') as string
        );

        if (!isValidPassword) {
          throw new Error('Contraseña incorrecta');
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: {
    strategy: 'jwt',
  },
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: '/login',
    error: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.id) {
        (session.user as any).id = token.id;
      }
      return session;
    },
  },
};
