import { IsOptional, IsPositive, IsString, Max, Min } from "class-validator"



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
}