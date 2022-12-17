import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { PaymentConcept } from 'src/common/enums/common.enums';
import { StatusPaymentRequest } from '../enums/payment-reques.enums';

export class CreatePaymentsRequestDto {
  @IsString()
  readonly description: string;

  @IsString()
  @IsEnum(PaymentConcept)
  readonly concept: PaymentConcept;
  @IsMongoId()
  readonly community: string;

  @IsNumber()
  @IsPositive()
  readonly amount: number;

  @IsString()
  readonly currency: string;

  @IsEnum(StatusPaymentRequest)
  @IsString()
  @IsOptional()
  readonly status: StatusPaymentRequest;


  @IsArray()
  @IsMongoId({ each: true })
  @IsOptional()
  readonly locations: string[];

}
