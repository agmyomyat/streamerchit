import { Injectable } from '@nestjs/common';
import { TrpcService } from '../lib/trpc/trpc.service';
import {
  GetStreamerInfoInputZod,
  UpdateDonationSettingsInputZod,
} from './dto/user.trpc.dto';
import { UserService } from './user.service';
import { UserTrpcMiddleware } from './user.trpc.middleware';
import { z } from 'zod';
@Injectable()
export class UserTrpcResolver {
  constructor(
    private userService: UserService,
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
  getDonationSettings() {
    return this.protectedProcedure.query(async ({ ctx }) => {
      const settings = await this.userService.getDonationSettings(ctx.id);
      return settings;
    });
  }
  updateDonationSettings() {
    return this.protectedProcedure
      .input(UpdateDonationSettingsInputZod)
      .mutation(async ({ ctx, input }) => {
        const settings = await this.userService.updateDonationSettings(
          ctx.id,
          input
        );
        return settings;
      });
  }
}
