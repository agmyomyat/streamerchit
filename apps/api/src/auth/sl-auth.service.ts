import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';

@Injectable()
export class StreamLabsAuthService {
  constructor(private prisma: PrismaService) {}
  connectStreamLabsAccount(user_email: string) {}
}
