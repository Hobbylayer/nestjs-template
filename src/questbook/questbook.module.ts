import { Module } from '@nestjs/common';
import { QuestbookService } from './questbook.service';
import { QuestbookController } from './questbook.controller';

@Module({
  controllers: [QuestbookController],
  providers: [QuestbookService]
})
export class QuestbookModule {}
