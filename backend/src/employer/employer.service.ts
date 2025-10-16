import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateEmployerDto } from './dto/update-employer.dto';
import { EmployerListQueryDto } from './dto/employer-query.dto';
@Injectable()
export class EmployerService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.employer.findMany({
      include: { user: true, company: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const employer = await this.prisma.employer.findUnique({
      where: { id },
      include: { user: true, company: true },
    });
    if (!employer) throw new NotFoundException('Employer không tồn tại');
    return employer;
  }
  async me(userId: number) {
    const employer = await this.prisma.employer.findUnique({
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
        company: true,
      },
    });
    if (!employer) throw new NotFoundException('Employer không tồn tại');
    return employer;
  }

  async update(userId: number, data: UpdateEmployerDto) {
    const employer = await this.prisma.employer.findUnique({
      where: { userId },
    });
    if (!employer) throw new NotFoundException('Employer không tồn tại');
    const { name, phone, ...res } = data;
    return this.prisma.employer.update({
      where: { userId },
      data: {
        ...res,
        user: {
          update: {
            name: data.name,
            phone: data.phone,
          },
        },
        dob: res.dob ? new Date(res.dob) : employer.dob,
      },
    });
  }

  async delete(id: number) {
    const employer = await this.prisma.employer.findUnique({ where: { id } });
    if (!employer) throw new NotFoundException('Employer không tồn tại');

    return this.prisma.employer.delete({ where: { id } });
  }
  async getAll(query: EmployerListQueryDto) {
    const prismaArgs = query.toPrismaArgs();

    const total = await this.prisma.employer.count({
      where: prismaArgs.where,
    });

    const rows = await this.prisma.employer.findMany(prismaArgs);

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
  async getAllByCompany(userId: number, query: EmployerListQueryDto) {
    const company = await this.prisma.company.findUnique({ where: { userId } });
    if (!company) throw new NotFoundException('Company không tồn tại');
    query.setCompanyId(company.id);
    const prismaArgs = query.toPrismaArgs();

    const total = await this.prisma.employer.count({
      where: prismaArgs.where,
    });

    const rows = await this.prisma.employer.findMany(prismaArgs);

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
}
