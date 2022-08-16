import { IsMongoId, IsString } from 'class-validator'

export class CreateLocationDto {

    @IsString()
    readonly address: string;

    @IsMongoId()
    readonly community: string;

}
