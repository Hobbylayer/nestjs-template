import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { NewsService } from './news.service';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) { }

  @Post()
  create(@Body() createNewsDto: CreateNewsDto) {
    return this.newsService.create(createNewsDto);
  }

  @Get('community/:communityId')
  findByCommunity(
    @Param('communityId', ParseMongoIdPipe) communityId,
    @Query() paginationDto: PaginationDto
  ) {
    return this.newsService.findByCommunity(communityId, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateNewsDto: UpdateNewsDto
  ) {
    return this.newsService.update(id, updateNewsDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.newsService.remove(id);
  }

  @Patch('activate/:id')
  activate(
    @Param('id') id: string,
  ) {
    return this.activate(id)
  }

  @Patch('inactivate/:id')
  inactivate(
    @Param('id') id: string,
  ) {
    return this.inactivate(id)
  }
}
