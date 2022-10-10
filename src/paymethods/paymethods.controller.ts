import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymethodsService } from './paymethods.service';
import { CreatePaymethodDto } from './dto/create-paymethod.dto';
import { UpdatePaymethodDto } from './dto/update-paymethod.dto';

@Controller('paymethods')
export class PaymethodsController {
  constructor(private readonly paymethodsService: PaymethodsService) {}

  @Post()
  create(@Body() createPaymethodDto: CreatePaymethodDto) {
    return this.paymethodsService.create(createPaymethodDto);
  }

  @Get()
  findAll() {
    return this.paymethodsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymethodsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymethodDto: UpdatePaymethodDto) {
    return this.paymethodsService.update(+id, updatePaymethodDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymethodsService.remove(+id);
  }
}
