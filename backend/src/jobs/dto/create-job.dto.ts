import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsDateString,
  IsNumber,
} from 'class-validator';
import { JobLevel, JobType, EducationLevel } from '@prisma/client';

export class CreateJobDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsString()
  requirements?: string;

  @IsOptional()
  @IsString()
  benefits?: string;

  @IsOptional()
  @IsString()
  workingAddress?: string;

  @IsOptional()
  @IsString()
  workingTime?: string;

  @IsOptional()
  @IsString()
  applicationMethod?: string;

  @IsOptional()
  @IsString()
  salary?: string;

  @IsOptional()
  @IsString()
  experience?: string;

  @IsOptional()
  @IsInt()
  quantity?: number;

  @IsEnum(JobLevel)
  level: JobLevel;

  @IsOptional()
  @IsEnum(EducationLevel)
  education?: EducationLevel;

  @IsEnum(JobType)
  type: JobType;

  @IsOptional()
  @IsString()
  categories?: string;

  @IsOptional()
  @IsString()
  mustSkills?: string;

  @IsOptional()
  @IsString()
  niceSkills?: string;

  @IsOptional()
  @IsString()
  areaTags?: string;

  @IsOptional()
  @IsDateString()
  deadline?: Date;
}
