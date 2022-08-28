import { PartialType } from '@nestjs/swagger';
import { CreateQuestbookDto } from './create-questbook.dto';

export class UpdateQuestbookDto extends PartialType(CreateQuestbookDto) {}
