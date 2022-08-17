import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsRequestsController } from './payments-requests.controller';
import { PaymentsRequestsService } from './payments-requests.service';

describe('PaymentsRequestsController', () => {
  let controller: PaymentsRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PaymentsRequestsController],
      providers: [PaymentsRequestsService],
    }).compile();

    controller = module.get<PaymentsRequestsController>(PaymentsRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
