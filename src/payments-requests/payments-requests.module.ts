import { Module } from '@nestjs/common';
import { PaymentsRequestsService } from './payments-requests.service';
import { PaymentsRequestsController } from './payments-requests.controller';

@Module({
  controllers: [PaymentsRequestsController],
  providers: [PaymentsRequestsService]
})
export class PaymentsRequestsModule {}
