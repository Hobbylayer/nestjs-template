import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';
// import { AuthModule } from 'src/auth/auth.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
    // The auth module was overriding the pagination implementation for the user
    // schema because it was making an infinite loop in modules registering.
    // The fix was add directly the passport module here to solve that issue but
    // maybe there is some bugs in consecuence of this :/
    // AuthModule,
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema
          schema.plugin(mongoosePaginate)
          return schema
        }
      }
    ])
  ],
  exports: [
    UsersService
  ]
})
export class UsersModule { }
