import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { UploadController } from './upload.controller';
import { AuthModule } from '../auth/auth.module';

@Module({
  providers: [FileService],
  controllers: [UploadController],
  imports: [AuthModule],
  exports: [FileService],
})
export class FileModule {}
