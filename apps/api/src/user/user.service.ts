import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
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
    return { image: donationPage.user.image, name: donationPage.user.name };
  }
}
