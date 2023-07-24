import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { customAlphabet } from 'nanoid';
import {
  CreatePayoutPayload,
  ListPayoutHistoryQuery,
} from './payout.interfaces';
import { TRPCError } from '@trpc/server';
@Injectable()
export class PayoutService {
  constructor(private prisma: PrismaService) {}
  async createPayout(user_id: string, payload: CreatePayoutPayload) {
    const payout_uid = customAlphabet('1234567890', 10)();
    const balance = await this.prisma.balance.findUniqueOrThrow({
      where: { user_id: user_id },
    });
    if (balance.active_total < payload.amount) {
      throw new TRPCError({
        code: 'BAD_REQUEST',
        message: 'Insufficient funds',
      });
    }
    return this.prisma.$transaction(async (tx) => {
      const p1 = this.prisma.payout.create({
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
      const p2 = tx.balance.update({
        where: { user_id },
        data: {
          active_total: { decrement: payload.amount },
          real_total: { decrement: payload.amount },
        },
      });
      const [r1] = await Promise.all([p1, p2]);
      return r1;
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
