import { Controller, Get, Param, Delete } from '@nestjs/common';
import { ReportsService } from './reports.service';
import { ParseMongoIdPipe } from 'src/common/pipes/parse-mongo-id.pipe';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) { }

  @Get('location/:id/debt')
  totalDebtsByLocation(@Param('id', ParseMongoIdPipe) id: string) {
    return this.reportsService.totalDebtsByLocation(id);
  }

  @Get('debtors/:id')
  findListOfDebtors(@Param('id', ParseMongoIdPipe) id: string) {
    return this.reportsService.findListOfDebtorsOne(id);
  }

  @Get('income/:id')
  totalIncomeByDate(
    @Param(':id', ParseMongoIdPipe) id: string,
  ) {
    return this.reportsService.totalIncomeByDate(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.reportsService.remove(id);
  }
  
  @Get('community-earnings/:communityId')
  earningsByCommunity(
    @Param('communityId', ParseMongoIdPipe) id: string
  ) {
    return this.reportsService.earningsByCommunity(id)
  }

  @Get('community-earnings/by-bank/:bankId')
  earningsByBank(
    @Param('bankId', ParseMongoIdPipe) id: string
  ) {
    return this.reportsService.earningsByBank(id);
  }
}
