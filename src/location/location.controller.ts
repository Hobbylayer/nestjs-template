import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) { }

  @Post()
  create(@Body() createLocationDto: CreateLocationDto) {
    return this.locationService.create(createLocationDto);
  }

  @Get(':id')
  findAllByCummunityId(@Param('id', ParseMongoIdPipe) id: string, @Query() paginationDto: PaginationDto) {
    return this.locationService.findAllByCommunityId(id, paginationDto);
  }

  @Get(':id')
  findOneById(@Param('id', ParseMongoIdPipe) id: string) {
    return this.locationService.findOneById(id);
  }

  @Get('by-name/:name')
  findOneByName(@Query('name') name: string) {
    return this.locationService.findOneByName(name)
  }

  @Put(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateLocationDto: UpdateLocationDto) {
    return this.locationService.update(id, updateLocationDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.locationService.remove(id);
  }
}
