import { MinioService } from './../minio/minio.service';
import { Injectable } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import slugify from 'slugify';
import { PrismaService } from 'src/prisma/prisma.service';
import { File as MulterFile } from 'multer';
import { PostListQueryDto } from './dto/post-query.dto';

@Injectable()
export class PostsService {
  constructor(
    private prisma: PrismaService,
    private readonly minioService: MinioService,
  ) {}

  private async generateUniqueSlug(title: string, excludeId?: number) {
    const baseSlug = slugify(title, {
      lower: true,
      strict: true,
      locale: 'vi',
    });
    let slug = baseSlug;
    let counter = 1;

    while (
      await this.prisma.post.findFirst({
        where: {
          slug,
          ...(excludeId ? { NOT: { id: excludeId } } : {}),
        },
      })
    ) {
      slug = `${baseSlug}-${counter++}`;
    }

    return slug;
  }

  async create(dto: CreatePostDto) {
    const slug = await this.generateUniqueSlug(dto.title);

    return this.prisma.post.create({
      data: {
        ...dto,
        slug,
        publishedAt: dto.status === 'PUBLISHED' ? new Date() : null,
      },
    });
  }

  async getAll(query: PostListQueryDto) {
    const prismaArgs = query.toPrismaArgs();

    const total = await this.prisma.post.count({
      where: prismaArgs.where,
    });

    const rows = await this.prisma.post.findMany(prismaArgs);

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

  async findOne(id: number) {
    return this.prisma.post.findUnique({ where: { id } });
  }

  async update(id: number, dto: UpdatePostDto) {
    let slug: string | undefined;

    if (dto.title) {
      slug = await this.generateUniqueSlug(dto.title, id);
    }

    return this.prisma.post.update({
      where: { id },
      data: {
        ...dto,
        ...(slug ? { slug } : {}),
        ...(dto.status === 'PUBLISHED' ? { publishedAt: new Date() } : {}),
      },
    });
  }

  async remove(id: number) {
    return this.prisma.post.delete({ where: { id } });
  }

  async uploadThumbnail(id: string, file: MulterFile) {
    if (!file) {
      throw new Error('File is required');
    }

    const fileUrl = await this.minioService.uploadFile(file);
    const updatedPost = await this.prisma.post.update({
      where: { id: Number(id) },
      data: {
        thumbnail: fileUrl,
      },
    });
    return fileUrl;
  }
}
