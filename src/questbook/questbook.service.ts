import { Injectable } from '@nestjs/common';
import { CreateQuestbookDto } from './dto/create-questbook.dto';
import { UpdateQuestbookDto } from './dto/update-questbook.dto';

@Injectable()
export class QuestbookService {
  create(createQuestbookDto: CreateQuestbookDto) {
    return 'This action adds a new questbook';
  }

  findAll() {
    return `This action returns all questbook`;
  }

  findOne(id: number) {
    return `This action returns a #${id} questbook`;
  }

  update(id: number, updateQuestbookDto: UpdateQuestbookDto) {
    return `This action updates a #${id} questbook`;
  }

  remove(id: number) {
    return `This action removes a #${id} questbook`;
  }
}
