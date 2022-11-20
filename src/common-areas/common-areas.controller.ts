import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Param,
  Body,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CommonAreasService } from './common-areas.service';
import { CreateCommonAreaDto } from './dto/create-common-area.dto';
import { UpdateCommonAreaDto } from './dto/update-common-area.dto';

@Controller('common-areas')
export class CommonAreasController {
  constructor(private readonly commonAreasService: CommonAreasService) {}

  @Get(':communityId')
  byCommunity(
    @Param('communityId', ParseMongoIdPipe) communityId: Types.ObjectId,
  ) {
    return this.commonAreasService.findByCommunity(communityId);
  }

  @Get('by-id/:id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.commonAreasService.findOne(id);
  }

  @Post()
  create(@Body() createCommonAreaDto: CreateCommonAreaDto) {
    return this.commonAreasService.create(createCommonAreaDto);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Body() updateCommonAreaDto: UpdateCommonAreaDto,
  ) {
    return this.commonAreasService.update(id, updateCommonAreaDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.commonAreasService.remove(id);
  }
}
