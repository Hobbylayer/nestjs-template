import { Module } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { PaymentsController } from './payments.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentsSchema } from './entities/payment.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2'
import { PaymentsRequest, PaymentsRequestSchema } from 'src/payments-requests/entities/payments-request.entity';
@Module({
  controllers: [PaymentsController],
  providers: [PaymentsService],
  imports: [
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
        name: PaymentsRequest.name,
        useFactory: () => {
          const schema = PaymentsRequestSchema
          schema.plugin(mongoosePaginate)
          return schema
        }
      }
    ])
  ]
})
export class PaymentsModule { }
