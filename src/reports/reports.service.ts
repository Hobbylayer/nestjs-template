import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payment } from '../payments/entities/payment.entity';
import { KindPayment, PaymentStatus } from '../payments/enums/enums.payments';
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

  async earningsByCommunity(communityId) {
    const incomeEarnings = await this.paymentModel
      .aggregate([
        {
          $match: {
            kind: KindPayment.INCOME,
            status: PaymentStatus.APPROVED,
            community: communityId,
          },
        },
        {
          $group: {
            _id: '$kind',
            totalAmount: {
              $sum: '$amount',
            },
          },
        },
      ])
      .exec();

    const expensesEarnings = await this.paymentModel
      .aggregate([
        {
          $match: {
            kind: KindPayment.EXPENSE,
            status: PaymentStatus.APPROVED,
            community: communityId,
          },
        },
        {
          $group: {
            _id: '$kind',
            totalAmount: {
              $sum: '$amount',
            },
          },
        },
      ])
      .exec();

    const incomes =
      incomeEarnings.length > 0 ? incomeEarnings[0].totalAmount : 0;
    const expenses =
      expensesEarnings.length > 0 ? expensesEarnings[0].totalAmount : 0;

    return {
      earnings: incomes - expenses,
    };
  }

  async earningsByBank(bankId: string): Promise<{
    earnings: number;
  }> {
    const incomeEarnings = await this.paymentModel
      .aggregate([
        {
          $match: {
            kind: KindPayment.INCOME,
            status: PaymentStatus.APPROVED,
            bank: bankId,
          },
        },
        {
          $group: {
            _id: '$kind',
            totalAmount: {
              $sum: '$amount',
            },
          },
        },
      ])
      .exec();

    const expensesEarnings = await this.paymentModel
      .aggregate([
        {
          $match: {
            kind: KindPayment.EXPENSE,
            status: PaymentStatus.APPROVED,
            bank: bankId,
          },
        },
        {
          $group: {
            _id: '$kind',
            totalAmount: {
              $sum: '$amount',
            },
          },
        },
      ])
      .exec();

    const incomes =
      incomeEarnings.length > 0 ? incomeEarnings[0].totalAmount : 0;
    const expenses =
      expensesEarnings.length > 0 ? expensesEarnings[0].totalAmount : 0;

    return {
      earnings: incomes - expenses,
    };
  }
}
