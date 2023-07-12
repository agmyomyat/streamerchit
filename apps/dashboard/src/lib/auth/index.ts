import {
  DefaultSession,
  NextAuthOptions,
  Session,
  TokenSet,
  getServerSession,
} from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { adapter } from './adapter';
import { client } from '../trpc';

export const authOptions: NextAuthOptions = {
  adapter: adapter,
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/sign-in',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async session({ token, session }) {
      console.log(token);
      console.log(session);
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.access_token = token.access_token;
      }
      return session;
    },
    async jwt({ token, account, user }) {
      if (!token || !token.email) return token;
      const data = await client.authjsAdapter.getUserWithAccessToken.query({
        email: token.email,
      });
      if (!data.user) {
        token.id = user!.id;
        return token;
      }
      console.log(token);
      console.log(account);
      return {
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
        picture: data.user.image,
        access_token: data.sc_access_token,
      };
    },
    signIn: () => {
      return false;
    },
    redirect() {
      return '/';
    },
  },
};

export const getAuthSession = () => getServerSession(authOptions);
