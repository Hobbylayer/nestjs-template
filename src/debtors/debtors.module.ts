import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DebtorsService } from './debtors.service';
import { DebtorsController } from './debtors.controller';
import {
  PaymentsRequest,
  PaymentsRequestSchema,
} from '../payments-requests/entities/payments-request.entity';
import { User, UserSchema } from '../users/entities/user.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  providers: [DebtorsService],
  controllers: [DebtorsController],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PaymentsRequest.name,
        useFactory: () => {
          const schema = PaymentsRequestSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: User.name,
        useFactory: () => {
          const schema = UserSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
})
export class DebtorsModule {}
