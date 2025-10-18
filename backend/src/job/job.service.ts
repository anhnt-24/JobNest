import { Employer } from '.prisma/client';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { ApplicationStatus, Job, JobStatus, Role } from '@prisma/client';
import { JobListQueryDto } from './dto/list-jobs-query.dto';
import { ApplicationListQueryDto } from './dto/list-application-query.req';
import { SavedJobListQueryDto } from './dto/list-saved-query.req';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}

  async create(userId: any, dto: CreateJobDto) {
    const employer = await this.prisma.employer.findUnique({
      where: { userId: +userId },
      include: { company: true },
    });
    if (!employer)
      throw new BadRequestException('User is not associated with any employer');
    if (!employer.company)
      throw new BadRequestException(
        'Employer is not associated with any company',
      );
    const companyId = employer.company.id;
    const employerId = employer.id;

    const job = await this.prisma.job.create({
      data: {
        ...dto,
        companyId: companyId,
        employerId: employerId,
      },
    });
    return job;
  }

  async findOne(id: number) {
    const job = await this.prisma.job.findUnique({
      where: { id },
      include: {
        company: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
      },
    });
    if (!job) throw new NotFoundException('Job not found');
    return job;
  }

  async getAll(query: JobListQueryDto) {
    const total = await this.prisma.job.count({
      where: query.toPrismaArgs().where,
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

  async getListByMe(user: any, query: JobListQueryDto) {
    if (user.role === Role.EMPLOYER) {
      const employer = await this.prisma.employer.findUnique({
        where: { userId: +user.userId },
      });
      if (!employer)
        throw new BadRequestException(
          'User is not associated with any employer',
        );
      query.setEmployerId(employer.id);
    } else if (user.role === Role.COMPANY) {
      const company = await this.prisma.company.findUnique({
        where: { userId: +user.userId },
      });
      if (!company)
        throw new BadRequestException(
          'User is not associated with any company',
        );
      query.setCompanyId(company.id);
    } else {
      throw new BadRequestException('Only employer or company can access');
    }
    const total = await this.prisma.job.count({
      where: query.toPrismaArgs().where,
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
        status: ApplicationStatus.PENDING,
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
  async getSavedJobs(userId: number, query: SavedJobListQueryDto) {
    query.setUserId(userId);

    const prismaArgs = query.toPrismaArgs();

    const total = await this.prisma.savedJob.count({
      where: prismaArgs.where,
    });

    const rows = await this.prisma.savedJob.findMany(prismaArgs);

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

  async isJobSaved(userId: number, jobId: number) {
    const saved = await this.prisma.savedJob.findUnique({
      where: {
        userId_jobId: { userId, jobId },
      },
    });
    return !!saved;
  }
}
