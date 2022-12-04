import {
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StatusPaymentRequest } from '../enums/payment-reques.enums';

export class QueryParamsPaymentRequestDto extends PaginationDto {
  @IsEnum(StatusPaymentRequest)
  @IsOptional()
  readonly payments_request_status?: StatusPaymentRequest;

  @IsMongoId()
  @IsOptional()
  readonly location?: string;

  @IsString()
  @IsOptional()
  readonly concept?: string;

  @IsOptional()
  @IsNumber()
  @IsPositive()
  readonly amount: number;
}
