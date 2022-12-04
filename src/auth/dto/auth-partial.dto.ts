import { PartialType } from '@nestjs/swagger';
import { AuthDto } from './auth.dto';

export class AuthPartialDto extends PartialType(AuthDto) {}
