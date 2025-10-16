import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '../config/config.service';
import * as bcrypt from 'bcryptjs';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Role } from '@prisma/client';
import { RedisService } from 'src/redis/redis.service';
import { CreateCompanyDto } from './dto/company-register.dto';
import { CreateEmployerDto } from './dto/employer-create.dto';
import { File as MulterFile } from 'multer';
import { MinioService } from 'src/minio/minio.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private config: ConfigService,
    private redisService: RedisService,
    private minioService: MinioService,
  ) {}

  private generateTokens(payload: {
    sub: string;
    email: string;
    role: string;
  }) {
    const accessToken = this.jwtService.sign(payload, {
      expiresIn: this.config.accessTokenExpireIn,
    });
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: this.config.refreshTokenExpireIn,
    });
    this.redisService.set(
      `refresh_token:${payload.sub}`,
      refreshToken,
      30 * 1000,
    );
    return { accessToken, refreshToken };
  }

  async register(dto: RegisterDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (userExists) throw new BadRequestException('Email đã tồn tại.');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.$transaction(async (tx) => {
      const user = await tx.user.create({
        data: {
          email: dto.email,
          name: dto.name,
          password: hash,
          role: Role.CANDIDATE,
          active: true,
        },
      });

      await tx.candidate.create({
        data: {
          userId: user.id,
        },
      });

      return user;
    });

    const payload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    };
    const tokens = this.generateTokens(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new BadRequestException('Email hoặc mật khẩu không đúng.');
    if (!user.active) throw new BadRequestException('Tài khoản đã bị khóa.');

    const match = await bcrypt.compare(dto.password, user.password);
    if (!match)
      throw new BadRequestException('Email hoặc mật khẩu không đúng.');

    const payload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    };
    const tokens = this.generateTokens(payload);

    const { password, ...data } = user;

    return {
      user: data,
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async refreshToken(refresh_token: string) {
    try {
      const decoded = this.jwtService.verify(refresh_token, {
        secret: this.config.jwtSecret,
      });

      const user = await this.prisma.user.findUnique({
        where: { id: parseInt(decoded.sub) },
      });
      const cachedToken = await this.redisService.get(
        `refresh_token:${decoded.sub}`,
      );
      if (cachedToken !== refresh_token) {
        throw new BadRequestException('Invalid refresh token.');
      }

      if (!user) {
        throw new BadRequestException('Invalid refresh token.');
      }
      const payload = {
        sub: user.id.toString(),
        email: user.email,
        role: user.role,
      };
      const tokens = this.generateTokens(payload);

      return {
        access_token: tokens.accessToken,
        refresh_token: tokens.refreshToken,
      };
    } catch (error) {
      throw new BadRequestException('Invalid refresh token');
    }
  }
  async logout(userId: string) {
    await this.redisService.del(`refresh_token:${userId}`);
    return { message: 'Đăng xuất thành công' };
  }

  async registerCompany(dto: CreateCompanyDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (userExists) throw new BadRequestException('Email đã tồn tại');

    const hash = await bcrypt.hash(dto.password, 10);

    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: dto.email,
          password: hash,
          role: Role.COMPANY,
          active: true,
          name: dto.name,
          phone: dto.phone,
        },
      });

      await tx.company.create({
        data: {
          userId: +newUser.id,
        },
      });

      return newUser;
    });

    const payload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    };
    const tokens = this.generateTokens(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
  }

  async me(id: number) {
    const { ...data } = await this.prisma.user.findUnique({
      where: { id },
    });
    const { password, ...user } = data;
    if (!user) {
      throw new NotFoundException('Không tìm thấy người dùng');
    }
    return user;
  }
  async registerEmployer(userId, dto: CreateEmployerDto) {
    const company = await this.prisma.company.findUnique({
      where: { userId: userId },
    });
    if (!company) throw new BadRequestException('Công ty không tồn tại');
    const userExists = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });
    if (userExists) throw new BadRequestException('Email đã tồn tại');

    const hash = await bcrypt.hash('12356789', 10);
    const { email, name, phone, ...data } = dto;
    const user = await this.prisma.$transaction(async (tx) => {
      const newUser = await tx.user.create({
        data: {
          email: email,
          password: hash,
          name: name,
          phone: phone,
          role: Role.EMPLOYER,
          active: true,
        },
      });

      await tx.employer.create({
        data: {
          ...data,
          companyId: company.id,
          userId: newUser.id,
        },
      });

      return newUser;
    });

    const payload = {
      sub: user.id.toString(),
      email: user.email,
      role: user.role,
    };
    const tokens = this.generateTokens(payload);

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
      },
      access_token: tokens.accessToken,
      refresh_token: tokens.refreshToken,
    };
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
}
