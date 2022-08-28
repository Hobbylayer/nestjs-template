import { Test, TestingModule } from '@nestjs/testing';
import { QuestbookController } from './questbook.controller';
import { QuestbookService } from './questbook.service';

describe('QuestbookController', () => {
  let controller: QuestbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [QuestbookController],
      providers: [QuestbookService],
    }).compile();

    controller = module.get<QuestbookController>(QuestbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
