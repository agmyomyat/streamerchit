import { Global, Module } from '@nestjs/common';
import { TrpcService } from './trpc.service';
@Global()
@Module({
  exports: [TrpcService],
  providers: [TrpcService],
})
export class TrpcModule {}
