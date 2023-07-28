import {
  Controller,
  HttpStatus,
  InternalServerErrorException,
  ParseFilePipeBuilder,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { S3ClientService } from '../lib/s3-client/s3-client.service';
import { FileService } from './file.service';
import { Request } from 'express';
import {
  UploadAuthGuard,
  __INTERNAL_USER_ID_HEADER_KEY__,
} from './upload-auth.guard';
import { nanoid } from 'nanoid';

@Controller('v1/upload')
export class UploadController {
  constructor(
    private s3Service: S3ClientService,
    private fileService: FileService
  ) {}
  @Post('/')
  @UseGuards(UploadAuthGuard)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg|jpeg|png|gif|webp|ogg|mpeg',
        })
        .addMaxSizeValidator({
          maxSize: 5000000,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        })
    )
    file: Express.Multer.File,
    @Req() req: Request
  ) {
    const file_extension = this.fileService.getFileExtension(file.originalname);
    const file_uid = nanoid(21) + '.' + file_extension;
    // const uploadedFileData = await this.s3Service.upload({
    //   ...file,
    //   originalname: file_uid,
    // });
    const presigned = await this.s3Service.createUploadPresignedUrl(file_uid);
    return presigned;
    //   const user_id = req.headers[__INTERNAL_USER_ID_HEADER_KEY__] as string;
    //   try {
    //     await this.fileService.createUploadInLibrary(user_id, {
    //       file_type: file.mimetype,
    //       file_uid,
    //       original_name: file.originalname,
    //       public_url: uploadedFileData.url,
    //       size_in_byte: file.size,
    //       total_size_in_byte: file.size,
    //     });
    //   } catch (e) {
    //     await this.s3Service.delete({ file_key: file_uid });
    //     throw new InternalServerErrorException(e);
    //   }
    //   return uploadedFileData;
  }
}
