import { Injectable } from '@nestjs/common';
import { TrpcService } from '../lib/trpc/trpc.service';
import {
  CreatePayoutInputZod,
  GetDonationHistoryInputZod,
  GetStreamerInfoInputZod,
  ListPayoutHistoryInputZod,
  UpdateDonationSettingsInputZod,
  UpdateTipPageSettingsInputZod,
} from './dto/user.trpc.dto';
import { UserService } from './user.service';
import { UserTrpcMiddleware } from './user.trpc.middleware';
import { z } from 'zod';
import { DonationService } from '../donation/donation.service';
import { FileService } from '../file/file.service';
import { PrismaService } from '../lib/prisma/prisma.service';
import { TRPCError } from '@trpc/server';
import { PayoutService } from '../payout/payout.service';
@Injectable()
export class UserTrpcResolver {
  constructor(
    private userService: UserService,
    private donationService: DonationService,
    private trpc: TrpcService,
    private trpcMiddleware: UserTrpcMiddleware,
    private fileService: FileService,
    private prisma: PrismaService,
    private payoutService: PayoutService
  ) {}
  private readonly publicProcedure = this.trpc.use.procedure;
  private readonly protectedProcedure = this.trpc.use.procedure.use(
    this.trpcMiddleware.auth()
  );
  queryStreamerInfo() {
    return this.publicProcedure
      .input(GetStreamerInfoInputZod)
      .query(async ({ input }) => {
        return await this.userService.getStreamerInfoForPublic({
          page_handle: input.page_handle,
        });
      });
  }
  getDonationHistory() {
    return this.protectedProcedure
      .input(GetDonationHistoryInputZod)
      .query(async ({ input, ctx }) => {
        return this.donationService.getDonationHistory(ctx.id, {
          query: { skip: input.query.skip, take: input.query.take },
        });
      });
  }
  getDonationSettings() {
    return this.protectedProcedure.query(async ({ ctx }) => {
      const settings = await this.donationService.getDonationSettings(ctx.id);
      return settings;
    });
  }
  getTipPageSettings() {
    return this.protectedProcedure.query(async ({ ctx }) => {
      const tipPageSettings = await this.userService.getTipPageSettings(ctx.id);
      return tipPageSettings;
    });
  }
  updateTipPageSetttings() {
    return this.protectedProcedure
      .input(UpdateTipPageSettingsInputZod)
      .mutation(async ({ ctx, input }) => {
        return this.userService.updateTipPageSettings(ctx.id, input);
      });
  }
  updateDonationSettings() {
    return this.protectedProcedure
      .input(UpdateDonationSettingsInputZod)
      .mutation(async ({ ctx, input }) => {
        const settings = await this.donationService.updateDonationSettings(
          ctx.id,
          input
        );
        return settings;
      });
  }
  listLibraryFiles() {
    return this.protectedProcedure.query(async ({ ctx }) => {
      return this.fileService.listFilesFromLibrary(ctx.id);
    });
  }
  deleteFileFromLibrary() {
    return this.protectedProcedure
      .input(z.object({ file_id: z.string() }))
      .mutation(async ({ ctx, input }) => {
        await this.fileService.deleteFileFromLibrary(ctx.id, input.file_id);
        return { deleted: input.file_id };
      });
  }
  createPayout() {
    return this.protectedProcedure
      .input(CreatePayoutInputZod)
      .mutation(async ({ ctx, input }) => {
        const balance = await this.prisma.balance.findUniqueOrThrow({
          where: { id: ctx.id },
        });
        if (balance.active_total < input.amount) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Insufficient funds',
          });
        }
        return this.payoutService.createPayout(ctx.id, input);
      });
  }
  listPayoutHistory() {
    return this.protectedProcedure
      .input(ListPayoutHistoryInputZod)
      .query(async ({ ctx, input }) => {
        return this.payoutService.listPayoutHistory(ctx.id, {
          query: { take: input.query.take, skip: input.query.skip },
        });
      });
  }
  checkBalance() {
    return this.protectedProcedure.query(async ({ ctx }) => {
      return this.userService.checkBalance(ctx.id);
    });
  }
}
