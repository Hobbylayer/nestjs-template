import { IsArray, IsEmail, IsEnum, IsMongoId, IsOptional, IsPhoneNumber, IsString, IsUrl, MaxLength, MinLength } from "class-validator";
import { Types } from "mongoose";
import { Roles, UserStatus } from "../enums/users.enums";



export class CreateUserDto {

    @IsString()
    @MinLength(3)
    @MaxLength(30)
    readonly name: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly lastName: string;

    @IsPhoneNumber('VE')
    readonly phone: string;

    @IsEmail()
    readonly email: string;

    @IsString()
    @MinLength(3)
    @MaxLength(20)
    readonly dni: string;

    @IsString()
    @MinLength(8)
    @MaxLength(20)
    readonly password: string;

    @IsString()
    @IsEnum(UserStatus)
    @IsOptional()
    readonly status: UserStatus;

    @IsArray()
    @IsEnum(Roles, { each: true })
    readonly roles: Roles[];

    @IsUrl()
    @IsOptional()
    readonly urlAvatar: string;

    @IsMongoId()
    readonly community: Types.ObjectId;

    @IsMongoId()
    @IsOptional()
    readonly location?: Types.ObjectId
}
