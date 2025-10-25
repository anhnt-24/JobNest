import { MinioService } from 'src/minio/minio.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { File as MulterFile } from 'multer';
@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private minioService: MinioService,
  ) {}

  async findAll() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
      },
    });

    if (!user) throw new NotFoundException(`User with ID ${id} not found`);
    return user;
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.user.delete({ where: { id } });
    return { message: `User ${id} deleted successfully` };
  }
  async uploadAvatar(id: number, file: MulterFile) {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException('Không tìm thấy ứng viên.');
    }
    const imageUrl = await this.minioService.uploadFile(file);
    await this.prisma.user.update({
      where: { id },
      data: {
        avatarUrl: imageUrl,
      },
    });
    return imageUrl;
  }
  async updateActiveStatus(id: number, active: boolean) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id },
      data: { active },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }

  async updateVerifiedStatus(id: number, verified: boolean) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) throw new NotFoundException('User not found');

    return this.prisma.user.update({
      where: { id },
      data: { verified },
      select: {
        id: true,
        email: true,
        role: true,
        name: true,
        avatarUrl: true,
        createdAt: true,
      },
    });
  }
}
