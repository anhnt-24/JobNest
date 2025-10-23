import {
  Controller,
  Post,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
  Body,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { MinioService } from './minio.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { File as MulterFile } from 'multer';

@Controller('upload')
@UseGuards(JwtAuthGuard, RolesGuard)
export class MinioController {
  constructor(private readonly minioService: MinioService) {}
  @Post('single')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSingle(@UploadedFile() file: MulterFile) {
    return this.minioService.uploadFile(file);
  }

  @Post('multiple')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadMultiple(@UploadedFiles() files: MulterFile[]) {
    return this.minioService.uploadMultipleFiles(files);
  }
}
