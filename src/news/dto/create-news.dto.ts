import {
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateNewsDto {
  @IsString()
  @IsOptional()
  readonly title: string;

  @IsString()
  @MinLength(5)
  @MaxLength(280)
  readonly description: string;

  @IsMongoId()
  readonly community: string;
}
