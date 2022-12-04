import { IsEnum, IsString } from 'class-validator';
import { STATUS_DOCUMENT } from 'src/common/enums/common.enums';

export class CreatePaymethodDto {
  @IsString()
  readonly name: string;

  @IsString()
  readonly description: string;

  @IsEnum(STATUS_DOCUMENT)
  readonly status?: STATUS_DOCUMENT;
}
