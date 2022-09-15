import { IsEnum, IsOptional, IsPositive, IsString, Max, Min } from "class-validator"
import { STATUS_DOCUMENT } from "../enums/common.enums"



enum Sort {
    ASC = "ASC",
    DESC = "DESC"
}

export class PaginationDto {
    @IsOptional()
    @IsPositive()
    @Min(1)
    @Max(30)
    limit?: number

    @IsOptional()
    @IsPositive()
    page?: number

    @IsOptional()
    @IsEnum(Sort, { message: 'Invalid sort parameter, valid choices: ASC or DESC' })
    @IsString()
    sort: Sort

    @IsOptional()
    @IsString()
    name: string

    @IsOptional()
    @IsString()
    @IsEnum(STATUS_DOCUMENT)
    status: STATUS_DOCUMENT
}