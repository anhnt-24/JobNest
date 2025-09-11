import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApplicationStatus, Job, JobStatus } from '@prisma/client';
import { JobListQueryDto } from './dto/list-jobs-query.dto';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: number, dto: CreateJobDto): Promise<Job> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      include: {
        company: {
          select: {
            id: true,
          },
        },
      },
    });
    if (!user?.company?.id) throw new NotFoundException('Company not found');
    const job = await this.prisma.job.create({
      data: {
        ...dto,
        companyId: user.company.id,
      },
    });
    return job;
  }

  async findOne(id: number): Promise<Job> {
    const job = await this.prisma.job.findUnique({ where: { id } });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async findByCompany(
    companyId: number,
    page = 1,
    limit = 10,
    sortBy?: string,
    order: 'asc' | 'desc' = 'desc',
  ) {
    const where = { companyId };
    const skip = (page - 1) * limit;

    const orderBy = sortBy ? { [sortBy]: order } : { createdAt: 'desc' };

    const [items, total] = await this.prisma.$transaction([
      this.prisma.job.findMany({
        where,
        skip,
        take: limit,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              avatarUrl: true,
            },
          },
        },
      }),
      this.prisma.job.count({ where }),
    ]);

    return {
      items,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  async getAll(query: JobListQueryDto) {
    const total = await this.prisma.job.count({
      where: query.toPrismaArgs().where, // chỉ lấy phần where cho count
    });

    const rows = await this.prisma.job.findMany(query.toPrismaArgs());

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

  async update(id: number, dto: UpdateJobDto): Promise<Job> {
    const existing = await this.prisma.job.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Job not found');

    if ((dto as any).companyId) {
      const c = await this.prisma.company.findUnique({
        where: { id: (dto as any).companyId },
      });
      if (!c) throw new BadRequestException('companyId invalid');
    }

    const updated = await this.prisma.job.update({
      where: { id },
      data: {
        ...dto,
        deadline: dto.deadline ? new Date(dto.deadline as any) : undefined,
      },
    });
    return updated;
  }

  async remove(id: number): Promise<Job> {
    const existing = await this.prisma.job.findUnique({ where: { id } });
    if (!existing) throw new NotFoundException('Job not found');

    return this.prisma.job.delete({ where: { id } });
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
        status: ApplicationStatus.pending,
      },
    });
  }

  async toggleSaveJob(userId: number, jobId: number) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
    });
    if (!job) {
      throw new NotFoundException('Job không tồn tại');
    }
    const existing = await this.prisma.savedJob.findFirst({
      where: { userId, jobId },
    });

    if (existing) {
      await this.prisma.savedJob.delete({
        where: { id: existing.id },
      });
      return { message: 'Đã bỏ lưu job này' };
    } else {
      const saved = await this.prisma.savedJob.create({
        data: { userId, jobId },
      });
      return { saved };
    }
  }

  async updateStatus(id: number, status: JobStatus) {
    const job = await this.prisma.job.findUnique({ where: { id: id } });
    if (!job) throw new NotFoundException('Job không tồn tại');

    await this.prisma.job.update({
      where: { id },
      data: {
        status: status,
      },
    });
    return 'success';
  }

  async getCVsByJob(jobId: number) {
    const cvs = await this.prisma.application.findMany({
      where: { jobId },
      include: {
        candidate: {
          include: { cvs: true },
        },
      },
    });

    return cvs;
  }

  async getCompanyByJob(jobId: number) {
    const job = await this.prisma.job.findUnique({
      where: { id: jobId },
      include: { company: true },
    });

    if (!job) throw new NotFoundException('Job not found');

    return job.company;
  }

  async getAppliedJobs(userId: number) {
    const candidate = await this.prisma.candidate.findUnique({
      where: { userId },
    });
    if (!candidate) throw new Error('Candidate not found');

    return this.prisma.application.findMany({
      where: { candidateId: candidate.id },
      include: {
        job: {
          include: { company: true },
        },
      },
    });
  }

  async getSavedJobs(userId: number) {
    return this.prisma.savedJob.findMany({
      where: { userId },
      include: {
        job: {
          include: { company: true },
        },
      },
    });
  }

  async isJobSaved(userId: number, jobId: number) {
    const saved = await this.prisma.savedJob.findUnique({
      where: {
        userId_jobId: { userId, jobId },
      },
    });
    return !!saved;
  }
}
