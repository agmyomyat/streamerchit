import { Global, Module } from '@nestjs/common';
import { StreamlabsService } from './streamlabs.service';
import { HttpModule } from '@nestjs/axios';
@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 10000,
      maxRedirects: 5,
      baseURL: 'https://streamlabs.com/api/v2.0',
    }),
  ],
  providers: [StreamlabsService],
  exports: [StreamlabsService],
})
export class StreamlabsModule {}
