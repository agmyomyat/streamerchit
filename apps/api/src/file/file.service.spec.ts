import { Test } from '@nestjs/testing';
import { FileService } from './file.service';
import { PrismaService } from '../lib/prisma/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class PrismaClientMock {
  upload = {
    findUniqueOrThrow: jest.fn(),
  };

  fileLibrary = {
    update: jest.fn(),
  };
}
describe('fileService', () => {
  let fileService: FileService;
  let prisma: PrismaService;
  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      providers: [
        FileService,
        { provide: PrismaService, useClass: PrismaClientMock },
      ],
    }).compile();

    fileService = moduleRef.get<FileService>(FileService);
    prisma = moduleRef.get<PrismaService>(PrismaService);
  });

  describe('deleteFileFromLibrary', () => {
    const mockFile = {
      id: 'file_id_123',
      size_in_byte: '1024',
      file_library: {
        total_size_in_byte: '4096',
      },
    };
    it('should be working correctly', async () => {
      const result = '3072';
      (prisma.upload.findUniqueOrThrow as jest.Mock).mockResolvedValueOnce(
        mockFile
      );

      (prisma.fileLibrary.update as jest.Mock).mockImplementation(
        (arg: any) => arg.data.total_size_in_byte
      );

      expect(await fileService.deleteFileFromLibrary('mock', 'mock')).toEqual(
        result
      );
    });
  });
});
