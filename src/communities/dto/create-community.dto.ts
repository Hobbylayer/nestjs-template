import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { StatusCommunity } from '../enums/communities.enums';

export class CreateCommunityDto {
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

  @IsNumber()
  @IsOptional()
  @Min(1)
  exchangeRate: number;

  @IsString()
  @IsOptional()
  currency: string;

  @IsEmail()
  owner: string;

  @IsString()
  @IsOptional()
  @IsEnum(StatusCommunity)
  active: StatusCommunity;
}
