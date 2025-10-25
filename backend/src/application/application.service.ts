import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApplicationListQueryDto } from './dto/list-application-query.req';
import { ApplicationStatus } from '@prisma/client';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async getMyAppliedJobs(userId: number, query: ApplicationListQueryDto) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId },
    });
    if (!candidate) throw new Error('Candidate not found');

    query.setCandidateId(candidate.id);

    const prismaArgs = query.toPrismaArgs();

    const total = await this.prisma.application.count({
      where: prismaArgs.where,
    });

    const rows = await this.prisma.application.findMany(prismaArgs);

    return {
      items: rows,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }
  async getAppliedJobs(query: ApplicationListQueryDto) {
    const prismaArgs = query.toPrismaArgs();

    const total = await this.prisma.application.count({
      where: prismaArgs.where,
    });

    const rows = await this.prisma.application.findMany(prismaArgs);

    return {
      items: rows,
      meta: {
        total,
        page: query.page,
        limit: query.limit,
        totalPages: Math.ceil(total / query.limit),
      },
    };
  }
  async applyForJob(
    candidateId: number,
    jobId: number,
    cvId: number,
    message?: string,
  ) {
    const job = await this.prisma.job.findUnique({ where: { id: jobId } });
    if (!job) throw new NotFoundException('Job không tồn tại.');

    const user = await this.prisma.user.findUnique({
      where: { id: candidateId },
      include: {
        candidate: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user?.candidate?.id)
      throw new NotFoundException('Không tìm thấy ứng viên.');

    return this.prisma.application.create({
      data: {
        candidateId: user.candidate.id,
        jobId,
        cvId,
        message,
        status: ApplicationStatus.PENDING,
      },
    });
  }
  async findOne(id: number) {
    const app = await this.prisma.application.findUnique({
      where: { id },
      include: {
        candidate: {
          include: { user: true },
        },
        job: {
          include: { company: true },
        },
        cv: true,
      },
    });

    if (!app) throw new NotFoundException('Application not found');
    return app;
  }

  async update(id: number, data: UpdateApplicationDto) {
    const exists = await this.prisma.application.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Application not found');

    return this.prisma.application.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    const exists = await this.prisma.application.findUnique({ where: { id } });
    if (!exists) throw new NotFoundException('Application not found');

    await this.prisma.application.delete({ where: { id } });
    return { message: 'Application deleted successfully' };
  }
}
