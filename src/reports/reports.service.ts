import { Injectable } from '@nestjs/common';
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  findListOfDebtorsOne(id: string) {
    return 'List debtors';
  }

  totalIncomeByDate(id: string) {
    return `This action returns totalIncomeByDate`;
  }

  totalDebtsByLocation(id: string) {
    return `This action returns a #${id} report`;
  }

  remove(id: string) {
    return `This action removes a #${id} report`;
  }
}
