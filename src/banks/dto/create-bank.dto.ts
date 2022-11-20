import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { Types } from 'mongoose';
import { BANK_ACCOUNT_KIND } from '../enums/banks.enums';

export class CreateBankDto {
  @IsString()
  @MinLength(3)
  readonly name: string;

  @IsEnum(BANK_ACCOUNT_KIND)
  @IsString()
  readonly kind: BANK_ACCOUNT_KIND;

  @IsOptional()
  @IsString()
  readonly number: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  readonly currency: string;

  @IsOptional()
  @IsNumber()
  readonly balance: string;

  @IsMongoId()
  readonly community: Types.ObjectId;
}
