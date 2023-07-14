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
  async getDonationSettings(userId: string) {
    const settings = await this.prisma.donationSetting.findFirstOrThrow({
      where: { user_id: userId },
    });
    const { id, user_id, ...rest } = settings;
    return rest;
  }
  async updateDonationSettings(
    user_id: string,
    data: Prisma.DonationSettingUpdateInput
  ) {
    await this.prisma.donationSetting.update({
      where: { user_id },
      data,
    });
    return { update: true };
  }
}
