import { Controller, Get, Query, Param } from '@nestjs/common';
import { Types } from 'mongoose';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { DebtorsService } from './debtors.service';

@Controller('debtors')
export class DebtorsController {
  constructor(private readonly debtorsService: DebtorsService) {}

  @Get(':id')
  getDebtorsByCommunity(
    @Param('id', ParseMongoIdPipe) id: Types.ObjectId,
    @Query() paginationDto: PaginationDto,
  ) {
    return this.debtorsService.findByCommunity(id, paginationDto);
  }
}
