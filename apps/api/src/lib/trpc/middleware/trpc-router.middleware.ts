import { Injectable, NestMiddleware } from '@nestjs/common';
import { createExpressMiddleware } from '@trpc/server/adapters/express';
import { NextFunction, Request, Response } from 'express';
import { TrpcService } from '../trpc.service';
import { DonationTrpcResolver } from '../../../donation/donation.trpc.resolver';
import { ReportService } from '../../report/report.service';
import { UserTrpcResolver } from '../../../user/user.trpc.resolver';

@Injectable()
export class TrpcRouterMiddleware implements NestMiddleware {
  private readonly appRouter = this.setUpAppRouter();
  constructor(
    private trpcService: TrpcService,
    private donationResolver: DonationTrpcResolver,
    private report: ReportService,
    private userResolver: UserTrpcResolver
  ) {}
  private setUpAppRouter() {
    const router = this.trpcService.use.router;
    const donation = router({
      createTransaction: this.donationResolver.createDonationTrasaction(),
      transactionStatus: this.donationResolver.getDonationTransactionStatus(),
      createPaymentSession: this.donationResolver.createPaymentSession(),
    });
    const user = router({
      info: this.userResolver.queryStreamerInfo(),
    });
    const _router = router({
      donation: donation,
      user: user,
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
