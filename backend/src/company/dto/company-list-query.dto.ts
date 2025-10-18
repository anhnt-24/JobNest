import { IsOptional, IsInt, IsEnum, IsString } from 'class-validator';
import { IntersectionType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { PaginationDto } from 'src/common/type/pagination.req';

export class CompanyFilterDto {
  @IsOptional()
  @IsString()
  name?: string; // tìm theo tên công ty

  @IsOptional()
  @IsString()
  industry?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  taxCode?: string;

  @IsOptional()
  @IsInt()
  employeeCount?: number;

  @IsOptional()
  @IsInt()
  userId?: number;
}

export class CompanyListQueryDto extends IntersectionType(
  CompanyFilterDto,
  PaginationDto,
) {
  setUserId(id: number) {
    this.userId = id;
    return this;
  }

  toPrismaArgs(): Prisma.CompanyFindManyArgs {
    const { page, limit, ...filter } = this;

    const where: Prisma.CompanyWhereInput = {
      ...(filter.name && {
        name: { contains: filter.name, mode: 'insensitive' },
      }),
      ...(filter.industry && {
        industry: { contains: filter.industry, mode: 'insensitive' },
      }),
      ...(filter.address && {
        address: { contains: filter.address, mode: 'insensitive' },
      }),
      ...(filter.taxCode && { taxCode: filter.taxCode }),
      ...(filter.employeeCount !== undefined && {
        employeeCount: filter.employeeCount,
      }),
      ...(filter.userId !== undefined && { userId: filter.userId }),
    };

    return {
      where,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatarUrl: true,
          },
        },
      },
    };
  }
}
