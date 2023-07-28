import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_VARS } from '../../env.schema';
import {
  DeleteObjectCommand,
  DeleteObjectCommandInput,
  PutBucketCorsCommand,
  PutObjectCommand,
  PutObjectCommandInput,
  S3Client,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { FileData, FileServiceUploadResult } from './s3-client.interfaces';
@Injectable()
export class S3ClientService {
  constructor(private config: ConfigService<ENV_VARS>) {}
  private account_id = this.config.getOrThrow('R2_ACCOUNT_ID');
  private access_key = this.config.getOrThrow('R2_ACCESS_KEY');
  private secret_key = this.config.getOrThrow('R2_SECRET_KEY');
  private bucket = this.config.getOrThrow('R2_BUCKET_NAME');
  private public_url = this.config.getOrThrow('R2_PUBLIC_URL');
  endpoint = `https://${this.account_id}.r2.cloudflarestorage.com`;
  storageClient() {
    const client = new S3Client({
      region: 'auto',
      endpoint: this.endpoint,
      credentials: {
        accessKeyId: this.access_key,
        secretAccessKey: this.secret_key,
      },
    });

    return client;
  }
  private async uploadFile(file: Express.Multer.File) {
    const client = this.storageClient();

    const params = {
      Bucket: this.bucket,
      Key: file.originalname,
      Body: file.buffer,
    } satisfies PutObjectCommandInput;
    const command = new PutObjectCommand(params);
    try {
      const data = await client.send(command);
      console.log(data);
      return {
        url: `${this.public_url}/${params.Key}`,
        key: params.Key,
      };
    } catch (err) {
      console.error(err);
      throw new Error('An error occurred while uploading the file.');
    }
  }
  async createUploadPresignedUrl(file_key: string) {
    const client = this.storageClient();
    await client.send(
      new PutBucketCorsCommand({
        Bucket: this.bucket,
        CORSConfiguration: {
          CORSRules: new Array({
            AllowedHeaders: ['content-type'], //this is important, do not use "*"
            AllowedMethods: ['GET', 'PUT', 'HEAD'],
            AllowedOrigins: ['*'],
            ExposeHeaders: [],
          }),
        },
      })
    );
    const params = {
      Bucket: this.bucket,
      Key: file_key,
    } satisfies PutObjectCommandInput;
    const signed_url = await getSignedUrl(
      client,
      new PutObjectCommand(params),
      {
        expiresIn: 3600,
      }
    );
    return { signed_url, public_url: `${this.public_url}/${file_key}` };
  }
  async upload(
    fileData: Express.Multer.File
  ): Promise<FileServiceUploadResult> {
    return this.uploadFile(fileData);
  }
  async delete(fileData: FileData): Promise<void> {
    const client = this.storageClient();

    const params = {
      Bucket: this.bucket,
      Key: `${fileData.file_key}`,
    } satisfies DeleteObjectCommandInput;
    const command = new DeleteObjectCommand(params);

    try {
      const data = await client.send(command);
      console.log(data);
    } catch (err) {
      console.error(err);
      throw new Error('An error occurred while deleting the file.');
    }
  }
}
