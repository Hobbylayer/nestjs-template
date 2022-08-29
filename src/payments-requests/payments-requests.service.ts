import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose'
import { Payment } from 'src/payments/entities/payment.entity';
import { CreatePaymentsRequestDto } from './dto/create-payments-request.dto';
import { QueryParamsPaymentRequestDto } from './dto/query-params-payments-request.dto';
import { UpdatePaymentsRequestDto } from './dto/update-payments-request.dto';
import { PaymentsRequest } from './entities/payments-request.entity';

@Injectable()
export class PaymentsRequestsService {
  constructor(
    @InjectModel(PaymentsRequest.name)
    readonly paymentRequestModel: PaginateModel<PaymentsRequest>,
    @InjectModel(Payment.name)
    readonly paymentModel: PaginateModel<Payment>
  ) { }


  async create(createPaymentsRequestDto: CreatePaymentsRequestDto) {
    return await this.paymentRequestModel.create(createPaymentsRequestDto)
  }


  async findAllByCommunity(communityId: string, queryParams: QueryParamsPaymentRequestDto) {
    const { sort, limit, page, status, } = queryParams

    const paymetsRequests = await this.paymentRequestModel.paginate({
      community: communityId,
      ...(status ? { status } : {})
    }, {
      limit,
      page,
      sort: {
        createdAt: sort,
      },
    })

    return paymetsRequests
  }

  async findOne(id: string) {
    const { includePayments } = { includePayments: true }
    let paymentRequest: any;
    if (includePayments) {
      paymentRequest = await this.findPaymentRequestWithPayments(id)
    } else {
      paymentRequest = await this.paymentRequestModel
        .findOne({ _id: id })
        .select('-payments')
    }

    if (!paymentRequest) throw new NotFoundException
    return paymentRequest
  }

  async update(id: string, updatePaymentsReqquestDto: UpdatePaymentsRequestDto) {
    const paymentRequest = await this.paymentRequestModel.findOneAndUpdate(
      { _id: id },
      updatePaymentsReqquestDto,
      { new: true }
    )
    if (!paymentRequest) throw new NotFoundException
    return paymentRequest
  }

  async remove(id: string) {
    return await this.paymentRequestModel.findOneAndDelete({ _id: id })
  }

  async findPaymentRequestWithPayments(id: string) {
    const paymentRequest = await this.paymentRequestModel
      .findOne({ _id: id })
      .populate({
        path: 'payments',
        populate: {
          path: 'payment',
          select: 'number concept amount currency'
        }
      })
      .populate({
        path: 'payments',
        populate: {
          path: 'location',
          select: 'name _id'
        }
      })

    return paymentRequest
  }
}
