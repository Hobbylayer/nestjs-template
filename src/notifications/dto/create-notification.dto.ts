import { IsArray, IsBoolean, IsEnum, IsISO8601, IsOptional, IsString } from "class-validator";
import { KIND_NOTIFICATION } from "../enums";

export class CreateNotificationDto {

    @IsString()
    readonly title: string;

    @IsString()
    readonly body: string;

    @IsEnum(KIND_NOTIFICATION)
    readonly kind: KIND_NOTIFICATION;

    @IsArray()
    @IsString({ each: true })
    @IsOptional()
    readonly users?: string[];

    @IsString()
    @IsISO8601()
    @IsOptional()
    readonly date: string;

    @IsString()
    @IsISO8601()
    @IsOptional()
    readonly show_away_from: string;

    @IsString()
    @IsISO8601()
    @IsOptional()
    readonly show_until: string;

    @IsString()
    @IsOptional()
    readonly actionUrl?: string

    @IsString()
    @IsOptional()
    readonly actionText?: string

    @IsBoolean()
    @IsOptional()
    readonly haveAction?: boolean
}
