import { IsEnum, IsMongoId, IsOptional } from "class-validator";
import { PaginationDto } from "src/common/dto/pagination.dto";
import { StatusPaymentRequest } from "../enums/payment-reques.enums";



export class QueryParamsPaymentRequestDto extends PaginationDto {

    @IsEnum(StatusPaymentRequest)
    @IsOptional()
    readonly payments_request_status?: StatusPaymentRequest

    @IsMongoId()
    @IsOptional()
    readonly location?: string
}