import { PartialType } from '@nestjs/swagger';
import { CreatePaymethodDto } from './create-paymethod.dto';

export class UpdatePaymethodDto extends PartialType(CreatePaymethodDto) {}
