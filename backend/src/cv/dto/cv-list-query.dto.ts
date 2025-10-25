import { IsEnum, IsOptional, IsInt } from 'class-validator';
import { CVType, CVFormat, Prisma } from '@prisma/client';
import { IntersectionType } from '@nestjs/mapped-types';
import { PaginationDto } from 'src/common/type/pagination.req';

export enum CvOrderField {
  createdAt = 'createdAt',
  updatedAt = 'updatedAt',
  title = 'title',
}

export class CvFilterDto {
  @IsOptional()
  @IsEnum(CVType)
  type?: CVType;

  @IsOptional()
  @IsEnum(CVFormat)
  format?: CVFormat;

  @IsOptional()
  @IsInt()
  candidateId?: number;
}

export class CvListQueryDto extends IntersectionType(
  CvFilterDto,
  PaginationDto,
) {
  @IsOptional()
  orders?: Partial<Record<CvOrderField, Prisma.SortOrder>>;
  setCandidateId(id: number) {
    this.candidateId = id;
    return this;
  }
  toPrismaArgs(): Prisma.CVFindManyArgs {
    const { page, limit, orders, ...filter } = this;

    const where: Prisma.CVWhereInput = {
      ...filter,
      isDeleted: true,
    };

    const orderBy: Prisma.CVOrderByWithRelationInput[] = orders
      ? (Object.entries(orders) as [CvOrderField, Prisma.SortOrder][]).map(
          ([field, direction]) => ({
            [field]: direction,
          }),
        )
      : [{ createdAt: 'desc' }];

    return {
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    };
  }
}
