import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PaymentsRequestsService } from './payments-requests.service';
import { CreatePaymentsRequestDto } from './dto/create-payments-request.dto';
import { UpdatePaymentsRequestDto } from './dto/update-payments-request.dto';

@Controller('payments-requests')
export class PaymentsRequestsController {
  constructor(private readonly paymentsRequestsService: PaymentsRequestsService) {}

  @Post()
  create(@Body() createPaymentsRequestDto: CreatePaymentsRequestDto) {
    return this.paymentsRequestsService.create(createPaymentsRequestDto);
  }

  @Get()
  findAll() {
    return this.paymentsRequestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.paymentsRequestsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePaymentsRequestDto: UpdatePaymentsRequestDto) {
    return this.paymentsRequestsService.update(+id, updatePaymentsRequestDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.paymentsRequestsService.remove(+id);
  }
}
