import { IsOptional, IsString } from 'class-validator';

export class UpdateIndustryDto {
  @IsOptional()
  @IsString()
  name?: string;
}
