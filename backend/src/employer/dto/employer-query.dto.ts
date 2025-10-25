import { IntersectionType } from '@nestjs/mapped-types';
import { Prisma } from '@prisma/client';
import { PaginationDto } from 'src/common/type/pagination.req';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class EmployerFilterDto {
  @IsOptional()
  @IsInt()
  userId?: number;

  @IsOptional()
  @IsInt()
  companyId?: number;

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  position?: string;
}
const ALLOWED_EMPLOYER_ORDER_FIELDS = [
  'createdAt',
  'updatedAt',
  'name',
] as const;

type EmployerOrderField = (typeof ALLOWED_EMPLOYER_ORDER_FIELDS)[number];
export function buildEmployerQuery(
  filter: EmployerFilterDto,
  orders?: Partial<Record<EmployerOrderField, Prisma.SortOrder>>,
): {
  where: Prisma.EmployerWhereInput;
  orderBy: Prisma.EmployerOrderByWithRelationInput[];
} {
  const where: Prisma.EmployerWhereInput = {
    AND: [
      filter.userId ? { userId: filter.userId } : {},
      filter.companyId ? { companyId: filter.companyId } : {},
      filter.name
        ? {
            user: {
              is: {
                name: {
                  contains: filter.name,
                  mode: 'insensitive',
                },
              },
            },
          }
        : {},
      filter.position
        ? { position: { contains: filter.position, mode: 'insensitive' } }
        : {},
      { isDeleted: false },
    ],
  };

  const orderBy: Prisma.EmployerOrderByWithRelationInput[] = orders
    ? (Object.entries(orders) as [EmployerOrderField, Prisma.SortOrder][])
        .filter(([field]) =>
          (ALLOWED_EMPLOYER_ORDER_FIELDS as readonly string[]).includes(field),
        )
        .map(([field, direction]) => {
          return {
            [field]: direction,
          } as Prisma.EmployerOrderByWithRelationInput;
        })
    : [{ createdAt: 'desc' }];

  return { where, orderBy };
}

export class EmployerListQueryDto extends IntersectionType(
  EmployerFilterDto,
  PaginationDto,
) {
  @IsOptional()
  orders?: Partial<Record<EmployerOrderField, Prisma.SortOrder>>;

  setCompanyId(companyId: number) {
    this.companyId = companyId;
  }

  toPrismaArgs(): Prisma.EmployerFindManyArgs {
    const { page, limit, orders, ...filter } = this;

    const { where, orderBy } = buildEmployerQuery(filter, orders);

    return {
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
      include: {
        user: true,
        company: true,
      },
    };
  }
}
