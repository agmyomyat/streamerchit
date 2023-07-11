import { Global, Module } from '@nestjs/common';
import { DingerService } from './dinger.service';
import { HttpModule } from '@nestjs/axios';
@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
      baseURL: 'https://api.dinger.asia',
    }),
  ],
  providers: [DingerService],
  exports: [DingerService],
})
export class DingerModule {}
