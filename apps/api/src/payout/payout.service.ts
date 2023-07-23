import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { customAlphabet } from 'nanoid';
import {
  CreatePayoutPayload,
  ListPayoutHistoryQuery,
} from './payout.interfaces';
@Injectable()
export class PayoutService {
  constructor(private prisma: PrismaService) {}
  async createPayout(user_id: string, payload: CreatePayoutPayload) {
    const payout_uid = customAlphabet('1234567890', 10)();
    return this.prisma.payout.create({
      data: {
        amount: payload.amount,
        bank_account_number: payload.bank_account_number,
        bank_type: payload.bank_type,
        bank_username: payload.bank_username,
        note: payload.note,
        status: 'PENDING',
        payout_uid,
        user: { connect: { id: user_id } },
      },
    });
  }
  async listPayoutHistory(
    user_id: string,
    { query: { take = 15, skip = 0 } }: ListPayoutHistoryQuery
  ) {
    return this.prisma.payout.findMany({
      where: { user_id },
      orderBy: { createdAt: 'desc' },
      take: take,
      skip: skip,
    });
  }
}
