import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { QuestbookService } from './questbook.service';
import { CreateQuestbookDto } from './dto/create-questbook.dto';
import { UpdateQuestbookDto } from './dto/update-questbook.dto';

@Controller('questbook')
export class QuestbookController {
  constructor(private readonly questbookService: QuestbookService) {}

  @Post()
  create(@Body() createQuestbookDto: CreateQuestbookDto) {
    return this.questbookService.create(createQuestbookDto);
  }

  @Get()
  findAll() {
    return this.questbookService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.questbookService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateQuestbookDto: UpdateQuestbookDto,
  ) {
    return this.questbookService.update(+id, updateQuestbookDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.questbookService.remove(+id);
  }
}
