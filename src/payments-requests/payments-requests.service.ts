import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose'
import { CreatePaymentsRequestDto } from './dto/create-payments-request.dto';
import { QueryParamsPaymentRequestDto } from './dto/query-params-payments-request.dto';
import { UpdatePaymentsRequestDto } from './dto/update-payments-request.dto';
import { PaymentsRequest } from './entities/payments-request.entity';

@Injectable()
export class PaymentsRequestsService {
  constructor(
    @InjectModel(PaymentsRequest.name)
    readonly paymentRequestModel: PaginateModel<PaymentsRequest>
  ) { }


  async create(createPaymentsRequestDto: CreatePaymentsRequestDto) {
    return await this.paymentRequestModel.create(createPaymentsRequestDto)
  }
  //TODO add filter by location
  async findAllByCommunity(communityId: string, queryParams: QueryParamsPaymentRequestDto) {
    const { sort, limit, page, status } = queryParams
    const paymetsRequests = await this.paymentRequestModel.paginate({
      community: communityId,
      ...(status ? { status } : {})
    }, {
      limit,
      page,
      sort: {
        createdAt: sort,
      }
    })

    return paymetsRequests
  }

  async findOne(id: string) {
    const paymentRequest = await this.paymentRequestModel.findOne({ _id: id })
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
}
