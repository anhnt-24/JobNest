import { CVType } from '@prisma/client';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateCvDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  type?: CVType;

  @IsOptional()
  @IsString()
  fileUrl?: string;

  @IsOptional()
  @IsString()
  thumbnailUrl?: string;

  @IsOptional()
  @IsString()
  format?: string;

  @IsOptional()
  fileSize?: number;

  @IsOptional()
  templateId?: number;

  @IsOptional()
  content?: any;
}
