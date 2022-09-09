import { IsEnum, IsOptional, IsPositive, IsString, Max, Min } from "class-validator"
import { STATUS_DOCUMENT } from "../enums/common.enums"



type Sort = "ASC" | "DESC"

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