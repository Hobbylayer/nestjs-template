import { IsString, IsMongoId, MinLength, MaxLength } from 'class-validator';

export class CreateCommonAreaDto {
  @IsString()
  @MinLength(3)
  @MaxLength(30)
  name: string;

  @IsString()
  description: string;

  @IsMongoId()
  community: string;
}
