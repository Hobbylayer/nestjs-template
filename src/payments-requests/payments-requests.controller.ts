import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { PaymentsRequestsService } from './payments-requests.service';
import { CreatePaymentsRequestDto } from './dto/create-payments-request.dto';
import { UpdatePaymentsRequestDto } from './dto/update-payments-request.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('payments-requests')
export class PaymentsRequestsController {
  constructor(private readonly paymentsRequestsService: PaymentsRequestsService) { }

  @Post()
  create(@Body() createPaymentsRequestDto: CreatePaymentsRequestDto) {
    return this.paymentsRequestsService.create(createPaymentsRequestDto);
  }

  @Get('community/:id')
  findAllByCommunity(
    @Param('id', ParseMongoIdPipe) id: string,
    @Query() paginationDto: PaginationDto
  ) {
    return this.paymentsRequestsService.findAllByCommunity(id, paginationDto);
  }

  @Get(':id')
  findOne(@Param('id', ParseMongoIdPipe) id: string) {
    return this.paymentsRequestsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseMongoIdPipe) id: string,
    @Body() updatePaymentsRequestDto: UpdatePaymentsRequestDto
  ) {
    return this.paymentsRequestsService.update(id, updatePaymentsRequestDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseMongoIdPipe) id: string) {
    return this.paymentsRequestsService.remove(id);
  }
}
