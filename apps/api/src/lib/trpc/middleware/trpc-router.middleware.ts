import { Injectable, NestMiddleware } from '@nestjs/common';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { NextFunction, Request, Response } from 'express';
import { TrpcService } from '../trpc.service';
import { DonationTrpcResolver } from '../../../donation/donation.trpc.resolver';
import { ReportService } from '../../report/report.service';
import { UserTrpcResolver } from '../../../user/user.trpc.resolver';
import { AuthjsAdapterResolver } from '../../../auth/authjs-adapter.trpc.resolver';

@Injectable()
export class TrpcRouterMiddleware implements NestMiddleware {
  private readonly appRouter = this.setUpAppRouter();
  constructor(
    private trpcService: TrpcService,
    private donationResolver: DonationTrpcResolver,
    private report: ReportService,
    private userResolver: UserTrpcResolver,
    private authjsAdapter: AuthjsAdapterResolver
  ) {}
  private setUpAppRouter() {
    const router = this.trpcService.use.router;
    const authjsAdapter = router({
      getUserWithAccessToken: this.authjsAdapter.getUserWithAccessToken(),
      createUser: this.authjsAdapter.createUser(),
      getUser: this.authjsAdapter.getUser(),
      getUserByEmail: this.authjsAdapter.getUserByEmail(),
      getUserByAccount: this.authjsAdapter.getUserByAccount(),
      updateUser: this.authjsAdapter.updateUser(),
      deleteUser: this.authjsAdapter.deleteUser(),
      linkAccount: this.authjsAdapter.linkAccount(),
      unlinkAccount: this.authjsAdapter.unlinkAccount(),
      createSession: this.authjsAdapter.createSession(),
      getSessionAndUser: this.authjsAdapter.getSessionAndUser(),
      updateSession: this.authjsAdapter.updateSession(),
      deleteSession: this.authjsAdapter.deleteSession(),
      createVerificationToken: this.authjsAdapter.createVerificationToken(),
      useVerificationToken: this.authjsAdapter.useVerificationToken(),
    });
    const donation = router({
      createTransaction: this.donationResolver.createDonationTrasaction(),
      transactionStatus: this.donationResolver.getDonationTransactionStatus(),
      createPaymentSession: this.donationResolver.createPaymentSession(),
    });
    const user = router({
      info: this.userResolver.queryStreamerInfo(),
      updateDonationSettings: this.userResolver.updateDonationSettings(),
      getDonationSettings: this.userResolver.getDonationSettings(),
      getDonations: this.userResolver.getDonationHistory(),
      getTipPageSettings: this.userResolver.getTipPageSettings(),
      updatetipPageSettings: this.userResolver.updateTipPageSetttings(),
      getDonationHistory: this.userResolver.getDonationHistory(),
    });
    const _router = router({
      donation: donation,
      user: user,
      authjsAdapter,
    });
    return _router;
  }
  use(req: Request, res: Response, next: NextFunction) {
    return createExpressMiddleware({
      router: this.appRouter,
      createContext: () => ({}),
      onError: async ({ error, input, path }) => {
        await this.report.reportTrpcError({
          error: {
            stack: error.stack,
            code: error.code,
            message: error.message,
            name: error.name,
            cause: {
              message: error.cause?.message || '',
              name: error.cause?.name || '',
              stack: error.cause?.stack,
            },
          },
          input: JSON.stringify(input),
          path: path || '',
        });
        console.log(error);
      },
    })(req, res, next);
  }
}
export type AppRouter = TrpcRouterMiddleware['appRouter'];
