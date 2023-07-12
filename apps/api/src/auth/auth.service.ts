import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { Prisma } from '@prisma/client';
type Provider_providerAccountId =
  Prisma.AccountFindUniqueArgs['where']['provider_providerAccountId'];
@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  createUser(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({ data });
  }
  getUser(id: string) {
    return this.prisma.user.findUnique({ where: { id } });
  }
  getUserByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }
  async getUserByAccount(
    provider_providerAccountId: Provider_providerAccountId
  ) {
    const account = await this.prisma.account.findUnique({
      where: { provider_providerAccountId },
      select: { user: true },
    });
    return account?.user ?? null;
  }
  updateUser({ id, ...data }: { id: string; data: Prisma.UserUpdateArgs }) {
    return this.prisma.user.update({ where: { id }, data });
  }
  deleteUser(id: string) {
    this.prisma.user.delete({ where: { id } });
  }
  linkAccount(data: Prisma.AccountCreateInput) {
    return this.prisma.account.create({ data });
  }
  unlinkAccount(provider_providerAccountId: Provider_providerAccountId) {
    return this.prisma.account.delete({
      where: { provider_providerAccountId },
    });
  }
  async getSessionAndUser(
    sessionToken: Prisma.SessionWhereUniqueInput['sessionToken']
  ) {
    const userAndSession = await this.prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true },
    });
    if (!userAndSession) return null;
    const { user, ...session } = userAndSession;
    return { user, session };
  }
  createSession(data: Prisma.SessionCreateInput) {
    return this.prisma.session.create({ data });
  }
  updateSession(data: Prisma.SessionUpdateInput) {
    return this.prisma.session.update({
      where: { sessionToken: data.sessionToken as string },
      data,
    });
  }
  deleteSession(sessionToken: string) {
    return this.prisma.session.delete({
      where: {
        sessionToken,
      },
    });
  }
  async createVerificationToken(data: Prisma.VerificationTokenCreateInput) {
    const verificationToken = await this.prisma.verificationToken.create({
      data,
    });
    return verificationToken;
  }
  async useVerificationToken(
    identifier_token: Prisma.VerificationTokenDeleteArgs['where']['identifier_token']
  ) {
    try {
      const verificationToken = await this.prisma.verificationToken.delete({
        where: { identifier_token },
      });
      return verificationToken;
    } catch (error) {
      // If token already used/deleted, just return null
      // https://www.prisma.io/docs/reference/api-reference/error-reference#p2025
      if ((error as Prisma.PrismaClientKnownRequestError).code === 'P2025')
        return null;
      throw error;
    }
  }
}
