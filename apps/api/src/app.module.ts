import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { ConfigModule } from '@nestjs/config';
import { ENV_SCHEMA } from './env.schema';
import { PrismaModule } from './lib/prisma/prisma.module';
import { AlertboxModule } from './alert-box/alert-box.module';
import { DonationModule } from './donation/donation.module';
import { PaymentModule } from './payment/payment.module';
import { DingerModule } from './lib/dinger/dinger.module';
import { TrpcModule } from './lib/trpc/trpc.module';
import { TrpcRouterMiddleware } from './lib/trpc/middleware/trpc-router.middleware';
import { AxiomModule } from './lib/axiom/axiom.module';
import { ReportModule } from './lib/report/report.module';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { FileModule } from './file/file.module';
import { S3ClientModule } from './lib/s3-client/s3-client.module';
import { PayoutModule } from './payout/payout.module';
import { StreamlabsModule } from './lib/streamlabs/streamlabs.module';

@Module({
  imports: [
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({ isGlobal: true, validate: ENV_SCHEMA.parse }),
    PrismaModule,
    AlertboxModule,
    DonationModule,
    PaymentModule,
    DingerModule,
    TrpcModule,
    AxiomModule,
    ReportModule,
    UserModule,
    AuthModule,
    FileModule,
    S3ClientModule,
    PayoutModule,
    StreamlabsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TrpcRouterMiddleware).forRoutes('trpc');
  }
}
