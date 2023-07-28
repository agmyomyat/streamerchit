import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { nanoid } from 'nanoid';
import { S3ClientService } from '../lib/s3-client/s3-client.service';
interface CreateUploadPayLoad {
  file_type: string;
  original_name: string;
  size_in_byte: number;
}
@Injectable()
export class FileService {
  constructor(
    private prisma: PrismaService,
    private s3Client: S3ClientService
  ) {}
  async createUploadInLibrary(user_id: string, payload: CreateUploadPayLoad) {
    const fileLibrary = await this.prisma.fileLibrary.findUniqueOrThrow({
      where: { user_id },
    });
    const file_extension = this.getFileExtension(payload.original_name);
    const file_uid = nanoid(21) + '.' + file_extension;
    const signedUrl = await this.s3Client.createUploadPresignedUrl(file_uid);
    const incrementedTotal =
      parseInt(fileLibrary.total_size_in_byte) + payload.size_in_byte;
    await this.prisma.fileLibrary.update({
      where: { user_id },
      data: {
        total_size_in_byte: incrementedTotal.toString(),
        upload: {
          create: {
            file_type: payload.file_type,
            original_name: payload.original_name,
            file_uid: file_uid,
            public_url: signedUrl.public_url,
            size_in_byte: payload.size_in_byte.toString(),
            uploaded_at: new Date(),
          },
        },
      },
    });
    return {
      file_uid,
      presigned_upload_url: signedUrl.signed_url,
      public_url: signedUrl.public_url,
    };
  }

  public getFileExtension(filename: string) {
    return filename.split('.').pop();
  }
  async listFilesFromLibrary(user_id: string) {
    const files = await this.prisma.upload.findMany({
      where: { file_library: { user_id } },
      orderBy: { created_at: 'desc' },
    });
    return { ...files };
  }
  async deleteFileFromLibrary(user_id: string, file_id: string) {
    const file = await this.prisma.upload.findFirstOrThrow({
      where: {
        OR: [{ file_uid: { equals: file_id } }, { id: { equals: file_id } }],
      },
      include: { file_library: true },
    });
    const decrementedTotal =
      parseInt(file.file_library!.total_size_in_byte) -
      parseInt(file.size_in_byte);
    return await this.prisma.$transaction(async (tx) => {
      const p1 = await tx.fileLibrary.update({
        where: { user_id },
        data: {
          total_size_in_byte: decrementedTotal.toString(),
          upload: { delete: { id: file.id } },
        },
      });
      await this.s3Client.delete({ file_key: file.file_uid });
      return p1;
    });
  }
}
