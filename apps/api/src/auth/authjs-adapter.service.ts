import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { nanoid } from 'nanoid';
import { TRPCError } from '@trpc/server';
import { AlertboxService } from '../alert-box/alert-box.service';
type Provider_providerAccountId =
  Prisma.AccountFindUniqueArgs['where']['provider_providerAccountId'];
@Injectable()
export class AuthjsAdapterService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private alertboxService: AlertboxService
  ) {}
  async getUserWithAccessToken(email: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { email },
    });
    const at = this.jwt.sign({ email, id: user.id }, { expiresIn: '15m' });
    return { user, sc_access_token: at };
  }
  createUser(data: Prisma.UserCreateInput, invite_to_register_id: string) {
    const page_handle = nanoid(10);
    const user_id = nanoid(20);
    return this.prisma.$transaction(
      async (tx) => {
        // const inviteToRegister = await tx.inviteToRegister.findUniqueOrThrow({
        //   where: { id: invite_to_register_id },
        // });
        // if (inviteToRegister.used_by) {
        //   throw new TRPCError({
        //     code: 'FORBIDDEN',
        //     cause: 'invite code',
        //     message: 'invite code already used',
        //   });
        // }
        const p2 = tx.user.create({
          data: {
            ...data,
            id: user_id,
            Balance: { create: {} },
            file_library: { create: { total_size_in_byte: '0' } },
            donation_setting: {
              create: {
                duration: 10,
                font_color: '#00FF00',
                font_size: '48px',
                font_weight: 800,
                message_font_color: '#FFFFFF',
                message_font_weight: 700,
                image_href:
                  'https://media.giphy.com/media/VVGdG2HimJl6APwPiE/giphy-downsized.gif',
                sound_href:
                  'https://www.redringtones.com/wp-content/uploads/2019/02/wubba-lubba-dub-dub-ringtone.mp3',
                message_font_size: '24px',
                alertbox_listener_token:
                  this.alertboxService.generateJwtToken(user_id),
              },
            },
            donation_page: {
              create: {
                url_handle: page_handle,
                avatar_url: data.image || '',
                page_cover: '',
                display_name: data.name || '',
              },
            },
          },
        });
        const [user] = await Promise.all([p2]);
        return user;
      },
      { maxWait: 10000, timeout: 20000 }
    );
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
