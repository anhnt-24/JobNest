import { IsString } from 'class-validator';

export class CreateIndustryDto {
  @IsString()
  name: string;
}
