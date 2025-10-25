import { MinioService } from '../minio/minio.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { File as MulterFile } from 'multer';
import { CVFormat, CVType } from '@prisma/client';
import { CvListQueryDto } from './dto/cv-list-query.dto';
import { CreateCvDto } from './dto/create-cv.dto';
import { UpdateCvDto } from './dto/update-cv.dto';
@Injectable()
export class CvService {
  constructor(
    private prisma: PrismaService,
    private miniosService: MinioService,
  ) {}

  async upload(candidateId: number, title: string, file: MulterFile) {
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
  async create(createCvDto: CreateCvDto, userId: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId },
    });
    if (!candidate) throw new NotFoundException("Candidate's not existing");
    return this.prisma.cV.create({
      data: {
        candidateId: candidate.id,
        title: createCvDto.title,
        type: CVType.GENERATED,
        fileUrl: createCvDto.fileUrl,
        thumbnailUrl: createCvDto.thumbnailUrl,
        fileSize: createCvDto.fileSize,
        templateId: createCvDto.templateId,
        content: createCvDto.content,
      },
    });
  }
  async update(id: number, updateCvDto: UpdateCvDto) {
    return this.prisma.cV.update({
      where: { id },
      data: {
        title: updateCvDto.title,
        thumbnailUrl: updateCvDto.thumbnailUrl,
        templateId: updateCvDto.templateId,
        content: updateCvDto.content,
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
  async delete(id: number) {
    const cv = await this.prisma.cV.findUnique({ where: { id } });
    if (!cv) throw new NotFoundException('Không tìm thấy CV');
    return this.prisma.cV.update({ where: { id }, data: { isDeleted: true } });
  }
  async findOne(id: number) {
    const cv = await this.prisma.cV.findUnique({ where: { id } });
    if (!cv) throw new NotFoundException('Không tìm thấy CV');
    return cv;
  }
}
