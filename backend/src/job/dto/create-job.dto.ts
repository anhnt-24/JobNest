import {
  IsString,
  IsOptional,
  IsInt,
  IsEnum,
  IsDateString,
  IsArray,
} from 'class-validator';
import {
  JobLevel,
  JobType,
  EducationLevel,
  ExperienceLevel,
} from '@prisma/client';

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
  @IsEnum(ExperienceLevel)
  experience?: ExperienceLevel;

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
  category?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  mustSkills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  niceSkills?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  areaTags?: string[];

  @IsOptional()
  @IsDateString()
  deadline?: Date;
}
