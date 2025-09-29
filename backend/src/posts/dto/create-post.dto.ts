import { PostStatus } from '@prisma/client';
import { IsString, IsOptional, IsArray, IsEnum } from 'class-validator';

export class CreatePostDto {
  @IsString()
  author: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  excerpt?: string;

  @IsString()
  content: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsString()
  category?: string;

  @IsOptional()
  @IsEnum(PostStatus)
  status?: PostStatus;
}
