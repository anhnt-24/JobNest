import { IntersectionType } from '@nestjs/mapped-types';
import { Prisma, PostStatus } from '@prisma/client';
import { PaginationDto } from 'src/common/type/pagination.req';
import { IsOptional, IsEnum, IsString, IsArray } from 'class-validator';

export class PostFilterDto {
  @IsOptional()
  @IsString()
  author?: string;

  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  slug?: string;

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;

  @IsOptional()
  @IsArray()
  tags?: string[];
}

export type PostFilter = {
  id?: number;
  author?: string;
  title?: string;
  slug?: string;
  category?: string;
  status?: PostStatus;
  tags?: string[]; // lọc theo tags
  publishedBefore?: Date;
  publishedAfter?: Date;
};

const ALLOWED_ORDER_FIELDS = [
  'createdAt',
  'updatedAt',
  'publishedAt',
  'views',
  'likes',
  'title',
] as const;
type PostOrderField = (typeof ALLOWED_ORDER_FIELDS)[number];

export function buildPostQuery(
  filter: PostFilter,
  orders?: Partial<Record<PostOrderField, Prisma.SortOrder>>,
): {
  where: Prisma.PostWhereInput;
  orderBy: Prisma.PostOrderByWithRelationInput[];
} {
  const where: Prisma.PostWhereInput = {
    AND: [
      filter.id ? { id: filter.id } : {},
      filter.author
        ? { author: { contains: filter.author, mode: 'insensitive' } }
        : {},
      filter.title
        ? { title: { contains: filter.title, mode: 'insensitive' } }
        : {},
      filter.slug ? { slug: { equals: filter.slug } } : {},
      filter.category
        ? { category: { contains: filter.category, mode: 'insensitive' } }
        : {},
      filter.status ? { status: filter.status } : {},
      filter.tags && filter.tags.length > 0
        ? { tags: { hasSome: filter.tags } }
        : {},
      filter.publishedBefore
        ? { publishedAt: { lte: filter.publishedBefore } }
        : {},
      filter.publishedAfter
        ? { publishedAt: { gte: filter.publishedAfter } }
        : {},
    ],
  };

  const orderBy: Prisma.PostOrderByWithRelationInput[] = orders
    ? (Object.entries(orders) as [PostOrderField, Prisma.SortOrder][])
        .filter(([field]) =>
          (ALLOWED_ORDER_FIELDS as readonly string[]).includes(field),
        )
        .map(([field, direction]) => {
          return { [field]: direction } as Prisma.PostOrderByWithRelationInput;
        })
    : [{ createdAt: 'desc' }];

  return { where, orderBy };
}

export class PostListQueryDto extends IntersectionType(
  PostFilterDto,
  PaginationDto,
) {
  @IsOptional()
  orders?: Partial<Record<PostOrderField, Prisma.SortOrder>>;

  toPrismaArgs(): Prisma.PostFindManyArgs {
    const { page, limit, orders, ...filter } = this;

    const { where, orderBy } = buildPostQuery(filter, orders);

    return {
      where,
      orderBy,
      skip: (page - 1) * limit,
      take: limit,
    };
  }
}
