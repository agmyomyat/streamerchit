import { Injectable } from '@nestjs/common';
import { TrpcService } from '../lib/trpc/trpc.service';
import { GetStreamerInfoInputZod } from './dto/user.trpc.dto';
import { UserService } from './user.service';
@Injectable()
export class UserTrpcResolver {
  constructor(private userService: UserService, private trpc: TrpcService) {}
  private readonly publicProcedure = this.trpc.use.procedure;
  queryStreamerInfo() {
    return this.publicProcedure
      .input(GetStreamerInfoInputZod)
      .query(async ({ input }) => {
        return await this.userService.getStreamerInfoForPublic({
          page_handle: input.page_handle,
        });
      });
  }
}
