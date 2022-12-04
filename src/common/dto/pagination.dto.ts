import {
  IsEnum,
  IsOptional,
  IsPositive,
  IsString,
  Max,
  Min,
} from 'class-validator';
import { STATUS_DOCUMENT } from '../enums/common.enums';

enum Sort {
  ASC = 'ASC',
  DESC = 'DESC',
}

export class PaginationDto {
  @IsOptional()
  @IsPositive()
  @Min(1)
  @Max(30)
  readonly limit?: number;

  @IsOptional()
  @IsPositive()
  readonly page?: number;

  @IsOptional()
  @IsEnum(Sort, {
    message: 'Invalid sort parameter, valid choices: ASC or DESC',
  })
  @IsString()
  readonly sort: Sort;

  // TODO remove and set on queryOptionsDto file
  @IsOptional()
  @IsString()
  readonly name: string;

  @IsOptional()
  @IsString()
  @IsEnum(STATUS_DOCUMENT)
  readonly status: STATUS_DOCUMENT;
}
