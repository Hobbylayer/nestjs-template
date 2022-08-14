import { Controller, Get, Post, Body, Patch, Param, Delete, Query, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.findOne(id);
  }

  @Get('community/:id')
  findAllByCommunityId(@Param('id', ParseMongoIdPipe) id: string, @Query() paginationDto: PaginationDto) {
    return this.usersService.findAllByCommunityId(id, paginationDto);
  }

  @Put(':id')
  update(@Param('id', ParseMongoIdPipe) id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.remove(id);
  }

  @Patch('activate/:id')
  activate(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.activate(id);
  }

  @Patch('deactivate/:id')
  deactivate(@Param('id', ParseMongoIdPipe) id: string) {
    return this.usersService.disable(id);
  }
}
