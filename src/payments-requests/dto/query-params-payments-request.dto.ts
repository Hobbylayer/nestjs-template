import { IsEnum } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";

enum StatusPaymentRequest {
    OPEN = 'open',
    VOID = 'void'
}

export class QueryParamsPaymentRequestDto extends PaginationDto {

    @IsEnum(StatusPaymentRequest)
    readonly status?: StatusPaymentRequest
}