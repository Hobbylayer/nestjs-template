import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel } from 'mongoose';
import { PaymentsRequest } from 'src/payments-requests/entities/payments-request.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { QueryParamsPayments } from './dto/query-params-payments.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';

@Injectable()
export class PaymentsService {

  constructor(
    @InjectModel(Payment.name)
    readonly paymentModel: PaginateModel<Payment>,
    @InjectModel(PaymentsRequest.name)
    readonly paymentRequestModel: Model<PaymentsRequest>
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


    await this.paymentRequestModel.findOneAndUpdate(
      {
        _id: payment.paymentRequest
      },
      {
        $push: {
          "payments": {
            payment: payment._id,
            location: payment.location
          }
        }
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
      ...(includeAllField ? {} : { select: 'date number kind amount referenceCode status' + fields }),
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

  async findOne(id: string, queryParams: QueryParamsPayments) {
    const { fields } = queryParams
    const payment = await this.paymentModel
      .findOne({ _id: id })
      .populate(fields.replace(',', " "), 'name')

    if (!payment) throw new NotFoundException
    return payment
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const payment = await this.paymentModel.findOneAndUpdate({ _id: id }, updatePaymentDto, { new: true })
      if (!payment) throw new BadRequestException('payment no registed')
      return payment
    } catch (error) {
      this.errorHandler(error)
    }

  }

  async remove(id: string) {
    try {
      await this.paymentModel.findOneAndDelete({ _id: id })
      return {
        message: "Payment deleted"
      }
    } catch (error) {
      this.errorHandler(error)
    }
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

  errorHandler(error: any) {
    if (error.name === 'CastError') throw new BadRequestException(error)
    throw new InternalServerErrorException(error)
  }
}
