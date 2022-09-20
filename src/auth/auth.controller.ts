import { Controller, Get, Post, Body, Param, UseGuards, Req, Headers, SetMetadata } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { AuthPartialDto } from './dto/auth-partial.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './decorators/get-user.decorator';
import { RawHeader } from './decorators/row-header.decorator'
import { User } from 'src/users/entities/user.entity';
import { IncomingHttpHeaders } from 'http';
import { UserRoleGuard } from './guards/user-role.guard';
import { RolesProtected } from './decorators/roles-protected.decorator';
import { ValidRoles } from './enums/valid-roles';
import { Auth } from './decorators';

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

  @Get('testing')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    // @Req() request: Express.Request
    @GetUser() user: User,
    @GetUser(['email', '_id']) email: string,
    @RawHeader() rawHeaders: string[],
    @Headers() headers: IncomingHttpHeaders
  ) {

    return {
      ok: true,
      message: 'hello from private route',
      user,
      email,
      rawHeaders,
      headers
    }
  }

  @Get('testing/v2')
  // @SetMetadata('roles', ['super-user'])
  @RolesProtected(ValidRoles.SUPER_USER)
  @UseGuards(AuthGuard(), UserRoleGuard)
  testingPrivateRoutev2(
    @GetUser() user: User,
  ) {

    return {
      ok: true,
      message: 'hello from private route',
      user,
    }
  }

  @Get('testing/v3')
  @Auth(ValidRoles.ADMIN)
  testingPrivateRoute3(
    @GetUser() user: User
  ) {
    return {
      user
    }
  }
}

