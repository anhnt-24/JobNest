import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { File as MulterFile } from 'multer';
import { MinioService } from 'src/minio/minio.service';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Injectable()
export class CompanyService {
  constructor(
    private prisma: PrismaService,
    private minioService: MinioService,
  ) {}

  async findByUserId(userId: number) {
    const company = await this.prisma.company.findFirst({
      where: { userId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });

    if (!company) throw new NotFoundException('Chưa có thông tin công ty.');
    return company;
  }

  async findOne(id: number) {
    const company = await this.prisma.company.findUnique({
      where: { id },
    });
    if (!company) throw new NotFoundException('Không tìm thấy công ty.');
    return company;
  }

  async updateByUserId(userId: number, data: UpdateCompanyDto) {
    const company = await this.prisma.company.findFirst({ where: { userId } });
    if (!company) throw new NotFoundException('Chưa có thông tin công ty.');
    const { name, phone, ...res } = data;
    return this.prisma.company.update({
      where: { id: company.id },
      data: {
        ...res,
        user: {
          update: {
            name: name,
            phone: phone,
          },
        },
      },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            name: true,
            avatarUrl: true,
          },
        },
      },
    });
  }

  async updateCover(userId: number, file: MulterFile) {
    const company = await this.prisma.company.findFirst({
      where: {
        user: {
          id: userId,
        },
      },
    });
    if (!company) throw new NotFoundException('Chưa có thông tin công ty');

    const logoUrl = await this.minioService.uploadFile(file);
    const data = await this.prisma.company.update({
      where: { id: company.id },
      data: {
        coverUrl: logoUrl,
      },
    });
    return data.coverUrl;
  }
}
