import { IntersectionType } from '@nestjs/mapped-types';
import {
  EducationLevel,
  JobLevel,
  JobStatus,
  JobType,
  Prisma,
} from '@prisma/client';
import { JobFilterDto } from './job-filter-dto';
import { PaginationDto } from 'src/common/type/pagination.req';
import { IsOptional } from 'class-validator';

const ALLOWED_ORDER_FIELDS = [
  'createdAt',
  'salary',
  'title',
  'deadline',
  'companyId',
] as const;
type JobOrderField = (typeof ALLOWED_ORDER_FIELDS)[number];

export function buildJobQuery(
  filter: JobFilterDto,
  orders?: Partial<Record<JobOrderField, Prisma.SortOrder>>,
): {
  where: Prisma.JobWhereInput;
  orderBy: Prisma.JobOrderByWithRelationInput[];
} {
  const where: Prisma.JobWhereInput = {
    AND: [
      filter.title
        ? { title: { contains: filter.title, mode: 'insensitive' } }
        : {},
      filter.level ? { level: filter.level } : {},
      filter.type ? { type: filter.type } : {},
      filter.education ? { education: filter.education } : {},
      filter.experience ? { experience: filter.experience } : {},
      filter.status ? { status: filter.status } : {},
      filter.deadlineBefore ? { deadline: { lte: filter.deadlineBefore } } : {},
      filter.companyId ? { companyId: filter.companyId } : {},
      filter.employerId ? { employerId: filter.employerId } : {},
    ],
  };

  const orderBy: Prisma.JobOrderByWithRelationInput[] = orders
    ? (Object.entries(orders) as [JobOrderField, Prisma.SortOrder][])
        .filter(([field]) =>
          (ALLOWED_ORDER_FIELDS as readonly string[]).includes(field),
        )
        .map(([field, direction]) => {
          return { [field]: direction } as Prisma.JobOrderByWithRelationInput;
        })
    : [{ createdAt: 'desc' }];

  return { where, orderBy };
}

export class JobListQueryDto extends IntersectionType(
  JobFilterDto,
  PaginationDto,
) {
  @IsOptional()
  orders?: Partial<Record<JobOrderField, Prisma.SortOrder>>;
  setEmployerId(employerId: number) {
    this.employerId = employerId;
  }
  setCompanyId(companyId: number) {
    this.companyId = companyId;
  }

  toPrismaArgs(): Prisma.JobFindManyArgs {
    const { page, limit, orders, ...filter } = this;

    const { where, orderBy } = buildJobQuery(filter, orders);

    return {
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: { company: true },
    };
  }
}
