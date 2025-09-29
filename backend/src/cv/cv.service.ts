import { MinioService } from '../minio/minio.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { File as MulterFile } from 'multer';
import { CVFormat } from '@prisma/client';
import { CvListQueryDto } from './dto/cv-list-query.dto';
@Injectable()
export class CvService {
  constructor(
    private prisma: PrismaService,
    private miniosService: MinioService,
  ) {}

  async uploadCv(candidateId: number, title: string, file: MulterFile) {
    const fileUrl = await this.miniosService.uploadFile(file);
    if (!fileUrl) throw new NotFoundException('Không tìm thấy file');

    let format: CVFormat | null = null;
    if (file.mimetype.includes('pdf')) format = CVFormat.PDF;
    else if (
      file.mimetype.includes('msword') ||
      file.mimetype.includes('officedocument.wordprocessingml')
    )
      format = CVFormat.DOCX;
    else if (file.mimetype.includes('png')) format = CVFormat.PNG;
    else if (file.mimetype.includes('jpg') || file.mimetype.includes('jpeg'))
      format = CVFormat.JPG;
    else format = CVFormat.OTHER;

    const fileSize = file.size / 1024;

    return this.prisma.cV.create({
      data: {
        candidateId,
        title,
        fileUrl,
        thumbnailUrl: '',
        format,
        fileSize,
      },
    });
  }

  async getAll(query: CvListQueryDto) {
    const specifications = query.toPrismaArgs();
    const [items, total] = await this.prisma.$transaction([
      this.prisma.cV.findMany(specifications),
      this.prisma.cV.count({ where: specifications.where }),
    ]);

    return {
      items,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }

  async getCvsByCandidate(userId: number, query: CvListQueryDto) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId: userId },
    });
    if (!candidate) throw new NotFoundException('Người dùng không tồn tại.');
    query.setCandidateId(candidate?.id);
    const specifications = query.toPrismaArgs();
    const [items, total] = await this.prisma.$transaction([
      this.prisma.cV.findMany(specifications),
      this.prisma.cV.count({ where: specifications.where }),
    ]);

    return {
      items,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }
  async updateCv(id: number, data: { title?: string; thumbnailUrl?: string }) {
    const cv = await this.prisma.cV.findUnique({ where: { id } });
    if (!cv) throw new NotFoundException('Không tìm thấy CV');

    return this.prisma.cV.update({
      where: { id },
      data,
    });
  }
  async deleteCv(id: number) {
    const cv = await this.prisma.cV.findUnique({ where: { id } });
    if (!cv) throw new NotFoundException('Không tìm thấy CV');
    return this.prisma.cV.delete({ where: { id } });
  }
}
