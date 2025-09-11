import { Injectable } from '@nestjs/common';
import * as Minio from 'minio';
import { extname } from 'path';
import { ConfigService } from '../config/config.service';
import { File as MulterFile } from 'multer';

@Injectable()
export class MinioService {
  private readonly client: Minio.Client;
  private readonly bucket: string;

  constructor(private readonly config: ConfigService) {
    this.client = new Minio.Client({
      endPoint: this.config.minioEndpoint,
      port: this.config.minioPort,
      useSSL: this.config.minioUseSSL,
      accessKey: this.config.minioAccessKey,
      secretKey: this.config.minioSecretKey,
    });

    this.bucket = this.config.minioBucket;
  }

  async uploadFile(file: MulterFile): Promise<string> {
    if (!file || !file.buffer) {
      throw new Error('File is missing or invalid');
    }

    const fileName = `${Date.now()}${extname(file.originalname)}`;

    const bucketExists = await this.client.bucketExists(this.bucket);
    if (!bucketExists) {
      await this.client.makeBucket(this.bucket, 'us-east-1');
    }

    await this.client.putObject(this.bucket, fileName, file.buffer, file.size, {
      'Content-Type': file.mimetype,
    });

    return `${this.config.minioPublicUrl}/${fileName}`;
  }

  async getFileUrl(objectName: string): Promise<string> {
    return `${this.config.minioPublicUrl}/${objectName}`;
  }

  async deleteFile(Link: string): Promise<void> {
    const objectName = Link.split('/').pop();
    if (!objectName) {
      throw new Error('Invalid file link');
    }
    await this.client.removeObject(this.bucket, objectName);
  }
}
