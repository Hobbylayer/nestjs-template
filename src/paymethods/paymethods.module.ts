import { Module } from '@nestjs/common';
import { PaymethodsService } from './paymethods.service';
import { PaymethodsController } from './paymethods.controller';

@Module({
  controllers: [PaymethodsController],
  providers: [PaymethodsService]
})
export class PaymethodsModule {}
