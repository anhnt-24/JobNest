import { IntersectionType } from '@nestjs/mapped-types';
import { Prisma, ApplicationStatus } from '@prisma/client';
import { PaginationDto } from 'src/common/type/pagination.req';
import { IsEnum, IsInt, IsOptional } from 'class-validator';

export class ApplicationFilterDto {
  @IsOptional()
  @IsInt()
  candidateId?: number;

  @IsOptional()
  @IsInt()
  jobId?: number;

  @IsOptional()
  @IsEnum(ApplicationStatus)
  status?: ApplicationStatus;
}

const ALLOWED_APPLICATION_ORDER_FIELDS = ['appliedAt', 'status'] as const;

type ApplicationOrderField = (typeof ALLOWED_APPLICATION_ORDER_FIELDS)[number];

export function buildApplicationQuery(
  filter: ApplicationFilterDto,
  orders?: Partial<Record<ApplicationOrderField, Prisma.SortOrder>>,
): {
  where: Prisma.ApplicationWhereInput;
  orderBy: Prisma.ApplicationOrderByWithRelationInput[];
} {
  const where: Prisma.ApplicationWhereInput = {
    AND: [
      filter.candidateId ? { candidateId: filter.candidateId } : {},
      filter.jobId ? { jobId: filter.jobId } : {},
      filter.status ? { status: filter.status } : {},
    ],
  };

  const orderBy: Prisma.ApplicationOrderByWithRelationInput[] = orders
    ? (Object.entries(orders) as [ApplicationOrderField, Prisma.SortOrder][])
        .filter(([field]) =>
          (ALLOWED_APPLICATION_ORDER_FIELDS as readonly string[]).includes(
            field,
          ),
        )
        .map(([field, direction]) => {
          return {
            [field]: direction,
          } as Prisma.ApplicationOrderByWithRelationInput;
        })
    : [{ appliedAt: 'desc' }];

  return { where, orderBy };
}

export class ApplicationListQueryDto extends IntersectionType(
  ApplicationFilterDto,
  PaginationDto,
) {
  @IsOptional()
  orders?: Partial<Record<ApplicationOrderField, Prisma.SortOrder>>;
  setCandidateId(candidateId: number) {
    this.candidateId = candidateId;
  }
  toPrismaArgs(): Prisma.ApplicationFindManyArgs {
    const { page, limit, orders, ...filter } = this;

    const { where, orderBy } = buildApplicationQuery(filter, orders);

    return {
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        candidate: true,
        job: {
          include: {
            company: {
              select: {
                id: true,
                name: true,
                avatarUrl: true,
              },
            },
          },
        },
        cv: true,
      },
    };
  }
}
