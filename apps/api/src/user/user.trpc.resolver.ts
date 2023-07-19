import { Injectable } from '@nestjs/common';
import { TrpcService } from '../lib/trpc/trpc.service';
import {
  GetDonationHistoryInputZod,
  GetStreamerInfoInputZod,
  UpdateDonationSettingsInputZod,
  UpdateTipPageSettingsInputZod,
} from './dto/user.trpc.dto';
import { UserService } from './user.service';
import { UserTrpcMiddleware } from './user.trpc.middleware';
import { z } from 'zod';
import { DonationService } from '../donation/donation.service';
@Injectable()
export class UserTrpcResolver {
  constructor(
    private userService: UserService,
    private donationService: DonationService,
    private trpc: TrpcService,
    private trpcMiddleware: UserTrpcMiddleware
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
}
