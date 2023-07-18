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
}
