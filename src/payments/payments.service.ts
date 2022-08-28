import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { QueryParamsPayments } from './dto/query-params-payments.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectModel(Payment.name)
    readonly paymentModel: PaginateModel<Payment>
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    const totalPayment = await this.paymentModel.find({
      community: createPaymentDto.community
    }).count()

    const number = this.createNumbering(totalPayment)
    const payment = await this.paymentModel.create({
      number,
      ...createPaymentDto
    })
    return payment
  }

  async findAllByCommunity(id: string, queryParams: QueryParamsPayments) {
    const {
      limit = 10,
      page = 1,
      sort = 'ASC',
      location,
      status,
      number,
      includeAllField = false,
      fields
    } = queryParams


    const payments = await this.paymentModel.paginate({
      community: id,
      ...(number ? { number } : {}),
      ...(location ? { location } : {}),
      ...(status ? { status } : {}),
    }, {
      limit,
      page,
      sort: {
        createdAt: sort.toLocaleUpperCase()
      },
      ...(includeAllField ? { select: 'date number kind location amount referenceCode status' } : {}),
      ...(fields ? {
        populate: {
          path: fields.replace(',', ' '),
          select: 'name dni email phone',
        }
      } : {})


    })
    if (!payments) throw new BadRequestException
    return payments
  }

  async findOne(id: string) {
    const payment = await this.paymentModel.findOne({ _id: id })
    if (!payment) throw new NotFoundException
    return payment
  }

  update(id: number, updatePaymentDto: UpdatePaymentDto) {
    return `This action updates a #${id} payment`;
  }

  remove(id: number) {
    return `This action removes a #${id} payment`;
  }

  createNumbering(totalPayment) {
    const payment = totalPayment + 1;
    const paymentNumberString = payment.toString();
    const paymentNumberLength = paymentNumberString.length;
    let paymentNumberStringPadded = '';
    for (let i = 0; i < 4 - paymentNumberLength; i++) {
      paymentNumberStringPadded += '0';
    }
    return paymentNumberStringPadded + paymentNumberString;
  }
}
