import { IsEmail, IsString, MaxLength, MinLength } from "class-validator"

export class AuthDto {

    @IsEmail()
    readonly email: string

    @IsString()
    @MinLength(8)
    @MaxLength(50)
    readonly password: string
}
