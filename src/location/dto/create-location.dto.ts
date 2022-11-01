import { IsMongoId, IsOptional, IsString } from 'class-validator'

export class CreateLocationDto {

    @IsString()
    //TODO add regular expression for name validation, e.g. uppercase, space number
    readonly name: string;

    @IsMongoId()
    readonly community: string;

    @IsMongoId()
    @IsOptional()
    readonly residentId?: string
}
