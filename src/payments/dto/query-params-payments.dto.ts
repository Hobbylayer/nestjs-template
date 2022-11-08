import { IsBoolean, IsEnum, IsISO8601, IsMongoId, IsOptional, IsString } from "class-validator"
import { PaginationDto } from "src/common/dto/pagination.dto"
import { PaymentStatus } from "../enums/enums.payments"


export type PaymentKind = 'expense' | 'income'
export enum DateSearchType {
    PAYMENT_DATE = 'payment_date',
    CREATE_AT_DATE = 'create_at_date'
}

export class QueryParamsPayments extends PaginationDto {

    @IsMongoId()
    @IsOptional()
    location: string

    @IsEnum(PaymentStatus)
    @IsString()
    @IsOptional()
    payment_status: PaymentStatus

    @IsBoolean()
    @IsOptional()
    includeAllField: boolean


    @IsString()
    @IsOptional()
    fields: string

    @IsString()
    @IsOptional()
    kind: PaymentKind

    @IsString()
    @IsOptional()
    number: string

    @IsString()
    @IsOptional()
    description?: string

    @IsEnum(DateSearchType)
    @IsOptional()
    findDateBy?: DateSearchType

    @IsISO8601()
    @IsOptional()
    startDate?: string


    @IsISO8601()
    @IsOptional()
    endDate?: string
}
