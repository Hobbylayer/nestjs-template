import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { StatusCompany } from '../enums/company.enums';

export class CreateCompanyDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  city: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  country: string;

  @IsPhoneNumber('VE')
  phone: string;

  @IsEmail()
  email: string;

  @IsString()
  @IsOptional()
  rif: string;

  @IsEmail()
  owner: string;

  @IsString()
  @IsOptional()
  @IsEnum(StatusCompany)
  active: StatusCompany;
}
