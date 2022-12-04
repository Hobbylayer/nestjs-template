import { Module } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ReportsController } from './reports.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Payment, PaymentsSchema } from '../payments/entities/payment.entity';

@Module({
  controllers: [ReportsController],
  providers: [ReportsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Payment.name,
        useFactory: () => {
          return PaymentsSchema;
        },
      },
    ]),
  ],
})
export class ReportsModule {}
