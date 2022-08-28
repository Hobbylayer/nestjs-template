import { IsBoolean, IsEnum, IsMongoId, IsOptional, IsString } from "class-validator"
import { PaginationDto } from "src/common/dto/pagination.dto"
import { PaymentStatus } from "../enums/enums.payments"

enum FieldPayment {
    LOCATION = 'location',
    RESIDENT = 'resident'
}

export class QueryParamsPayments extends PaginationDto {

    @IsMongoId()
    @IsOptional()
    location: string

    @IsEnum(PaymentStatus)
    @IsString()
    @IsOptional()
    status: PaymentStatus

    @IsBoolean()
    @IsOptional()
    includeAllField: boolean


    @IsString()
    @IsOptional()
    fields: string

    @IsString()
    @IsOptional()
    number: string
}