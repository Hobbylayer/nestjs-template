import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';

import * as bcrypt from 'bcrypt';
import { JwtPayload } from './interfaces/jw-payload';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { InjectModel } from '@nestjs/mongoose';
import { UserStatus } from 'src/users/enums/users.enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    readonly userModel: Model<User>,
    readonly jwtServices: JwtService,
  ) {}

  async login({ email, password }: AuthDto) {
    const user = await this.userModel
      .findOne({ email, status: UserStatus.ACTIVE })
      .select('password _id roles');
    if (!user) this.notValidCredencials();
    if (!bcrypt.compareSync(password, user.password))
      this.notValidCredencials();
    return {
      message: 'User authenticated',
      token: this.getJwt({ _id: user._id, roles: user.roles, companyId: user.company }),
    };
  }

  notValidCredencials() {
    throw new UnauthorizedException('Not valid credentials');
  }

  magicLink(email: string) {
    return 'magic link';
  }

  restorePassword(email: string) {
    return email;
  }

  private getJwt(payload: JwtPayload) {
    return this.jwtServices.sign(payload);
  }
}
