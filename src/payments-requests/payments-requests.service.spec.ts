import { Test, TestingModule } from '@nestjs/testing';
import { PaymentsRequestsService } from './payments-requests.service';

describe('PaymentsRequestsService', () => {
  let service: PaymentsRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PaymentsRequestsService],
    }).compile();

    service = module.get<PaymentsRequestsService>(PaymentsRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
