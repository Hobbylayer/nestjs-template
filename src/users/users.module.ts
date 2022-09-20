import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './entities/user.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  imports: [
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
