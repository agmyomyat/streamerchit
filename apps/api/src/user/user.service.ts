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
    });
    return { image: donationPage.avatar_url, name: donationPage.display_name };
  }
  async getTipPageSettings(user_id: string) {
    const tipPage = await this.prisma.donationPage.findUniqueOrThrow({
      where: { user_id },
    });
    const { id, user_id: _user_id, ...rest } = tipPage;
    return rest;
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
}
