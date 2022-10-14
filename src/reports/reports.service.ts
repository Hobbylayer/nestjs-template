import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../payments/entities/payment.entity';
import { KindPayment, PaymentStatus } from '../payments/enums/enums.payments'
import { CreateReportDto } from './dto/create-report.dto';
import { UpdateReportDto } from './dto/update-report.dto';

@Injectable()
export class ReportsService {
  constructor(
    @InjectModel(Payment.name)
    readonly paymentModel: Model<Payment>,
  ) {}

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
  
  async earningsByCommunity (communityId): Promise<{
    earnings: number,
  }> {
    const incomeEarning = await this.paymentModel.find({
      community: communityId,
      kind: KindPayment.INCOME,
      status: PaymentStatus.APPROVED
    }).count();

    const expensesCount = await this.paymentModel.find({
      community: communityId,
      kind: KindPayment.EXPENSE,
      status: PaymentStatus.APPROVED,
    }).count();

    return {
      earnings: incomeEarning - expensesCount,
    }
  }

  async earningsByBank(bankId: string): Promise<{
    earnings: number,
  }> {
    const incomeEarning = await this.paymentModel.find({
      bank: bankId,
      kind: KindPayment.INCOME,
      status: PaymentStatus.APPROVED
    }).count();

    const expensesCount = await this.paymentModel.find({
      bank: bankId,
      kind: KindPayment.EXPENSE,
      status: PaymentStatus.APPROVED,
    }).count();

    return {
      earnings: incomeEarning - expensesCount,
    }
  }
}
