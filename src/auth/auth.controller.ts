import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthPartialDto } from './dto/auth-partial.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('login')
  login(@Body() { email, password }: AuthDto) {
    return this.authService.login({ email, password });
  }


  @Post('restore-password')
  restorePassword(
    @Body() { email }: AuthPartialDto
  ) {
    return this.authService.restorePassword(email)
  }

  @Get('magic-link')
  magicLink(
    @Param() { email }: AuthPartialDto
  ) {
    return this.authService.magicLink(email)
  }
}

