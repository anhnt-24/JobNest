import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEnum,
  IsOptional,
  isString,
  IsDate,
} from 'class-validator';
import { Gender } from '@prisma/client';
import { Type } from 'class-transformer';

export class CreateEmployerDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsEnum(Gender)
  gender: Gender;

  @IsDate()
  @Type(() => Date)
  dob: Date;

  @IsString()
  address: string;

  @IsNotEmpty()
  position: string;

  @IsNotEmpty()
  employeeId: string;
}
