import { Injectable } from '@nestjs/common';
import { PrismaService } from '../lib/prisma/prisma.service';
import { nanoid } from 'nanoid';
import { S3ClientService } from '../lib/s3-client/s3-client.service';
interface CreateUploadPayLoad {
  total_size_in_byte: number;
  file_type: string;
  original_name: string;
  file_uid: string;
  public_url: string;
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
    const incrementedTotal =
      parseInt(fileLibrary.total_size_in_byte) + payload.total_size_in_byte;
    return this.prisma.fileLibrary.update({
      where: { user_id },
      data: {
        total_size_in_byte: incrementedTotal.toString(),
        upload: {
          create: {
            file_type: payload.file_type,
            original_name: payload.original_name,
            file_uid: payload.file_uid,
            public_url: payload.public_url,
            size_in_byte: payload.size_in_byte.toString(),
            uploaded_at: new Date(),
          },
        },
      },
      include: { upload: true },
    });
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
