import { IntersectionType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { PaginationDto } from 'src/common/type/pagination.req';
import { IsInt, IsOptional } from 'class-validator';

export class SavedJobFilterDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  jobId?: number;
}

const ALLOWED_SAVEDJOB_ORDER_FIELDS = ['savedAt'] as const;

type SavedJobOrderField = (typeof ALLOWED_SAVEDJOB_ORDER_FIELDS)[number];

export function buildSavedJobQuery(
  filter: SavedJobFilterDto,
  orders?: Partial<Record<SavedJobOrderField, Prisma.SortOrder>>,
): {
  where: Prisma.SavedJobWhereInput;
  orderBy: Prisma.SavedJobOrderByWithRelationInput[];
} {
  const where: Prisma.SavedJobWhereInput = {
    AND: [
      filter.userId ? { userId: filter.userId } : {},
      filter.jobId ? { jobId: filter.jobId } : {},
    ],
  };

  const orderBy: Prisma.SavedJobOrderByWithRelationInput[] = orders
    ? (Object.entries(orders) as [SavedJobOrderField, Prisma.SortOrder][])
        .filter(([field]) =>
          (ALLOWED_SAVEDJOB_ORDER_FIELDS as readonly string[]).includes(field),
        )
        .map(([field, direction]) => {
          return {
            [field]: direction,
          } as Prisma.SavedJobOrderByWithRelationInput;
        })
    : [{ savedAt: 'desc' }];

  return { where, orderBy };
}

export class SavedJobListQueryDto extends IntersectionType(
  SavedJobFilterDto,
  PaginationDto,
) {
  @IsOptional()
  orders?: Partial<Record<SavedJobOrderField, Prisma.SortOrder>>;

  setUserId(userId: number) {
    this.userId = userId;
  }

  toPrismaArgs(): Prisma.SavedJobFindManyArgs {
    const { page, limit, orders, ...filter } = this;

    const { where, orderBy } = buildSavedJobQuery(filter, orders);

    return {
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: true,
        job: {
          include: {
            company: {
              select: {
                user: {
                  select: {
                    name: true,
                    id: true,
                    avatarUrl: true,
                  },
                },
              },
            },
          },
        },
      },
    };
  }
}
