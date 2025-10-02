import { Injectable } from '@nestjs/common';

@Injectable()
export class ConfigService {
  get port(): number {
    return parseInt(process.env.PORT || '3000');
  }

  get apiContext(): string {
    return process.env.API_URL_CONTEXT || '/api/v1';
  }

  get jwtSecret(): string {
    return process.env.JWT_SECRET || 'secret';
  }

  get accessTokenExpireIn(): string {
    return process.env.ACCESS_TOKEN_EXPIRE_IN || '7d';
  }

  get refreshTokenExpireIn(): string {
    return process.env.REFRESH_TOKEN_EXPIRE_IN || '30d';
  }

  get minioEndpoint(): string {
    return process.env.MINIO_ENDPOINT || 'localhost';
  }

  get minioPort(): number {
    return Number(process.env.MINIO_PORT) || 9000;
  }

  get minioUseSSL(): boolean {
    return process.env.MINIO_USE_SSL === 'true';
  }

  get minioAccessKey(): string {
    return process.env.MINIO_ACCESS_KEY || 'minioadmin';
  }

  get minioSecretKey(): string {
    return process.env.MINIO_SECRET_KEY || 'minioadmin';
  }

  get minioBucket(): string {
    return process.env.MINIO_BUCKET || 'jobn';
  }

  get minioPublicUrl(): string {
    return process.env.MINIO_PUBLIC_URL || 'http://localhost:9000/jobn';
  }
}
