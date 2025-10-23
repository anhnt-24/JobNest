import { Global, Module } from '@nestjs/common';
import { MinioService } from './minio.service';
import { MinioController } from './mino.controller';

@Global()
@Module({
  providers: [MinioService],
  exports: [MinioService],
  controllers: [MinioController],
})
export class MinioModule {}
