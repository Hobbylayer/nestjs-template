import { Module } from '@nestjs/common';
import { PaymentsRequestsService } from './payments-requests.service';
import { PaymentsRequestsController } from './payments-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsRequest, PaymentsRequestSchema } from './entities/payments-request.entity';
import { Payment, PaymentsSchema } from '../payments/entities/payment.entity'
import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Location, LocationSchema } from 'src/location/entities/location.entity';

@Module({
  controllers: [PaymentsRequestsController],
  providers: [PaymentsRequestsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: PaymentsRequest.name,
        useFactory: () => {
          const schema = PaymentsRequestSchema
          schema.plugin(mongoosePaginate)
          return schema
        }
      }
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Payment.name,
        useFactory: () => {
          const schema = PaymentsSchema
          schema.plugin(mongoosePaginate)
          return schema
        }
      }
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Location.name,
        useFactory: () => {
          const schema = LocationSchema
          schema.plugin(mongoosePaginate)
          return schema
        }
      }
    ]),
  ],
})
export class PaymentsRequestsModule { }
