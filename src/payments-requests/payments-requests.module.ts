import { Module } from '@nestjs/common';
import { PaymentsRequestsService } from './payments-requests.service';
import { PaymentsRequestsController } from './payments-requests.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentsRequest, PaymentsRequestSchema } from './entities/payments-request.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

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
    ])
  ],
})
export class PaymentsRequestsModule { }
