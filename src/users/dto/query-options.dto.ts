import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

export class UsersQueryOptionsDto extends PaginationDto {
  @IsString()
  @IsOptional()
  readonly dni?: string;

  @IsString()
  @IsOptional()
  readonly fields?: string;

  @IsBoolean()
  @IsOptional()
  @Transform(({ value }) => value === 'true')
  readonly includeLocation?: boolean;
}
