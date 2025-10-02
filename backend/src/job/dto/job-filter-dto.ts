import {
  IsOptional,
  IsString,
  IsEnum,
  IsInt,
  Min,
  IsDateString,
} from 'class-validator';
import { Type } from 'class-transformer';
import {
  EducationLevel,
  JobLevel,
  JobType,
  JobStatus,
  Prisma,
  ExperienceLevel,
} from '@prisma/client';

export class JobFilterDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsEnum(JobLevel)
  level?: JobLevel;

  @IsOptional()
  @IsEnum(JobType)
  type?: JobType;

  @IsOptional()
  @IsEnum(EducationLevel)
  education?: EducationLevel;

  @IsOptional()
  @IsEnum(ExperienceLevel)
  experience?: ExperienceLevel;

  @IsOptional()
  @IsEnum(JobStatus)
  status?: JobStatus;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  salaryFrom?: number;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  salaryTo?: number;

  @IsOptional()
  @IsDateString()
  deadlineBefore?: Date;

  @IsOptional()
  @IsInt()
  companyId?: number;

  @IsOptional()
  @IsInt()
  employerId?: number;
}
