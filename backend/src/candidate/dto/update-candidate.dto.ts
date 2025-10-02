import { IsOptional, IsEnum, IsDate } from 'class-validator';
import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';
export class UpdateCandidateDto {
  @IsOptional()
  name?: string;

  @IsOptional()
  phone?: string;

  @IsOptional()
  @IsEnum(Gender)
  gender?: Gender;

  @IsOptional()
  @IsDate()
  @Type(() => Date)
  dob?: Date;
}
