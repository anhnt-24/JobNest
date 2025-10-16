import { MinioService } from '../minio/minio.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UpdateCandidateDto } from './dto/update-candidate.dto';
@Injectable()
export class CandidatesService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId: id },
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
    const { name, phone, ...res } = data;
    return this.prisma.candidate.update({
      where: { id: candidate.id },
      data: {
        ...res,
        user: {
          update: {
            name: data.name,
            phone: data.phone,
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
}
