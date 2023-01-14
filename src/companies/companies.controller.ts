import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Put,
} from '@nestjs/common';
import { Types } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { CommunitiesService } from './companies.service';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly communitiesService: CommunitiesService) { }

  @Post()
  create(@Body() createCommunityDto: CreateCompanyDto) {
    return this.communitiesService.create(createCommunityDto);
  }

  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    return this.communitiesService.findAll(paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: Types.ObjectId) {
    return this.communitiesService.findOne(id);
  }

  @Put(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updateCompanyDto: UpdateCompanyDto,
  ) {
    return this.communitiesService.update(id, UpdateCompanyDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.communitiesService.remove(id);
  }

  @Patch('activate/:id')
  activate(@Param('id', ParseMongoIdPipe) id: string) {
    return this.communitiesService.activate(id);
  }
  @Patch('deactivate/:id')
  deactivate(@Param('id', ParseMongoIdPipe) id: string) {
    return this.communitiesService.deactivate(id);
  }
}
