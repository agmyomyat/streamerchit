import { client } from '../trpc';
import { NextAuthOptions } from 'next-auth';

export const adapter: NextAuthOptions['adapter'] = {
  createUser: async (user) => {
    const res = await client.authjsAdapter.createUser.mutate(user);
    return new Promise((r) => {
      r({
        email: res.email!,
        emailVerified: res.emailVerified! as unknown as Date,
        id: res.id,
        image: res.image,
        name: res.name,
      });
    });
  },
  getUser: async (id) => {
    const res = await client.authjsAdapter.getUser.query({ id });
    if (!res) return null;
    return new Promise((r) => {
      r({
        email: res.email!,
        emailVerified: res.emailVerified! as unknown as Date,
        id: res.id || '',
        image: res.image,
        name: res.name,
      });
    });
  },
  getUserByEmail: async (email) => {
    const res = await client.authjsAdapter.getUserByEmail.query({ email });
    if (!res) return null;
    return new Promise((r) => {
      r({
        email: res.email!,
        emailVerified: res?.emailVerified! as unknown as Date,
        id: res.id || '',
        image: res.image,
        name: res.name,
      });
    });
  },
  getUserByAccount: async ({ providerAccountId, provider }) => {
    const res = await client.authjsAdapter.getUserByAccount.query({
      providerAccountId,
      provider,
    });
    if (!res) return null;
    return new Promise((r) => {
      r({
        email: res.email!,
        emailVerified: res?.emailVerified! as unknown as Date,
        id: res.id || '',
        image: res.image,
        name: res.name,
      });
    });
  },
  updateUser: async (user) => {
    const res = await client.authjsAdapter.updateUser.mutate(user);
    return new Promise((r) => {
      r({
        email: res.email!,
        emailVerified: res?.emailVerified! as unknown as Date,
        id: res.id || '',
        image: res.image,
        name: res.name,
      });
    });
  },
  deleteUser: async (id) => {
    await client.authjsAdapter.deleteUser.mutate({ id });
    return;
  },
  linkAccount: async (account) => {
    await client.authjsAdapter.linkAccount.mutate(account);
    return;
  },
  unlinkAccount: async ({ provider, providerAccountId }) => {
    await client.authjsAdapter.unlinkAccount.mutate({
      provider,
      providerAccountId,
    });
  },
  createSession: async (input) => {
    const res = await client.authjsAdapter.createSession.mutate(input);
    return new Promise((r) => {
      r({
        expires: res.expires as unknown as Date,
        sessionToken: res.sessionToken,
        userId: res.userId,
      });
    });
  },
  getSessionAndUser: async (sessionToken) => {
    const res = await client.authjsAdapter.getSessionAndUser.query({
      sessionToken,
    });
    if (!res) return null;
    return new Promise((r) => {
      r({ session: res.session as any, user: res.user as any });
    });
  },
  updateSession: async (input) => {
    const res = await client.authjsAdapter.updateSession.mutate(input);
    return new Promise((r) => {
      r({
        expires: res.expires as unknown as Date,
        sessionToken: res.sessionToken,
        userId: res.userId,
      });
    });
  },
  deleteSession: async (sessionToken) => {
    await client.authjsAdapter.deleteSession.mutate({ sessionToken });
    return;
  },
  createVerificationToken: async (input) => {
    const res = await client.authjsAdapter.createVerificationToken.mutate(
      input
    );
    return new Promise((r) => {
      r({
        expires: res.expires as unknown as Date,
        token: res.token,
        identifier: res.identifier,
      });
    });
  },
  useVerificationToken: async (input) => {
    const res = await client.authjsAdapter.useVerificationToken.query(input);
    if (!res) return null;
    return new Promise((r) => {
      r({
        expires: res.expires as unknown as Date,
        token: res.token,
        identifier: res.identifier,
      });
    });
  },
};
