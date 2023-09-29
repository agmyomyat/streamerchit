import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { Prisma } from '@prisma/client';
interface GetStreamerInfoParams {
  page_handle: string;
}
@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async getStreamerInfoForPublic({ page_handle }: GetStreamerInfoParams) {
    const donationPage = await this.prisma.donationPage.findUniqueOrThrow({
      where: { url_handle: page_handle },
      include: { user: true },
    });
    return {
      image: donationPage.avatar_url,
      name: donationPage.display_name,
      streamer_id: donationPage.user_id,
    };
  }
  async getTipPageSettings(user_id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: user_id },
      include: { donation_page: true, dinger_info: true },
    });
    const { id, user_id: _user_id, ...rest } = user.donation_page!;

    return { ...rest, payment_configured: !!user.dinger_info };
  }
  async checkBalance(user_id: string) {
    return this.prisma.balance.findUniqueOrThrow({ where: { user_id } });
  }
  async updateTipPageSettings(
    user_id: string,
    data: Omit<Prisma.DonationPageUpdateInput, 'user_id' | 'id' | 'user'>
  ) {
    const updatedTipPage = await this.prisma.donationPage.update({
      where: { user_id },
      data,
    });
    const { id, user_id: _user_id, ...rest } = updatedTipPage;
    return rest;
  }
  async registerPayment(
    user_id: string,
    data: Omit<
      Prisma.PaymentRegistrationCreateInput,
      'id' | 'user' | 'user_id' | 'status'
    >
  ) {
    return this.prisma.paymentRegistration.create({
      data: { ...data, status: 'PENDING', user: { connect: { id: user_id } } },
    });
  }
}
