import { MinioService } from '../minio/minio.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
import { File as MulterFile } from 'multer';
@Injectable()
export class CandidatesService {
  constructor(
    private prisma: PrismaService,
    private minioService: MinioService,
  ) {}

  async findOne(id: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId: id },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });

    if (!candidate) {
      throw new NotFoundException('Candidate not found.');
    }

    return candidate;
  }

  async update(userId: number, data: UpdateCandidateDto) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId },
    });
    if (!candidate) {
      throw new NotFoundException('Candidate not found.');
    }
    return this.prisma.candidate.update({
      where: { userId },
      data: {
        ...data,
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
          },
        },
      },
    });
  }
  async uploadAvatar(userId: number, file: MulterFile) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId },
    });
    if (!candidate) {
      throw new NotFoundException('Không tìm thấy ứng viên.');
    }
    const imageUrl = await this.minioService.uploadFile(file);
    await this.prisma.candidate.update({
      where: { userId },
      data: {
        avatarUrl: imageUrl,
      },
    });
    return imageUrl;
  }
}
