import { Test, TestingModule } from '@nestjs/testing';
import { QuestbookService } from './questbook.service';

describe('QuestbookService', () => {
  let service: QuestbookService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [QuestbookService],
    }).compile();

    service = module.get<QuestbookService>(QuestbookService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
