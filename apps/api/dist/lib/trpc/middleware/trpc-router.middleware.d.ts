import { NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { TrpcService } from '../trpc.service';
import { DonationTrpcResolver } from '../../../donation/donation.trpc.resolver';
import { ReportService } from '../../report/report.service';
import { UserTrpcResolver } from '../../../user/user.trpc.resolver';
export declare class TrpcRouterMiddleware implements NestMiddleware {
    private trpcService;
    private donationResolver;
    private report;
    private userResolver;
    private readonly appRouter;
    constructor(trpcService: TrpcService, donationResolver: DonationTrpcResolver, report: ReportService, userResolver: UserTrpcResolver);
    private setUpAppRouter;
    use(req: Request, res: Response, next: NextFunction): void;
}
export type AppRouter = TrpcRouterMiddleware['appRouter'];
