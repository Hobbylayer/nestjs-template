import { PartialType } from '@nestjs/swagger';
import { CreatePaymentsRequestDto } from './create-payments-request.dto';

export class UpdatePaymentsRequestDto extends PartialType(
  CreatePaymentsRequestDto,
) {}
