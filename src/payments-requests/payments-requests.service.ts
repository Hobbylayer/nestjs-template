import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { STATUS_DOCUMENT } from 'src/common/enums/common.enums';
import { Location } from 'src/location/entities/location.entity';
import { Payment } from 'src/payments/entities/payment.entity';
import { CreatePaymentsRequestDto } from './dto/create-payments-request.dto';
import { QueryParamsPaymentRequestDto } from './dto/query-params-payments-request.dto';
import { UpdatePaymentsRequestDto } from './dto/update-payments-request.dto';
import { PaymentsRequest } from './entities/payments-request.entity';

/*
 * The payments request are debit notes created by community admin
 */
@Injectable()
export class PaymentsRequestsService {
  constructor(
    @InjectModel(PaymentsRequest.name)
    readonly paymentRequestModel: PaginateModel<PaymentsRequest>,
    @InjectModel(Payment.name)
    readonly paymentModel: PaginateModel<Payment>,
    @InjectModel(Location.name)
    readonly locationModel: PaginateModel<Location>,
  ) {}

  async create(createPaymentsRequestDto: CreatePaymentsRequestDto) {
    const { community } = createPaymentsRequestDto;

    let locations = await this.locationModel
      .find({ community, status: STATUS_DOCUMENT.ACTIVE })
      .select('_id name');
    locations = locations.map(({ _id }) => _id);

    return await this.paymentRequestModel.create({
      ...createPaymentsRequestDto,
      debts: locations,
    });
  }

  async findAllByCommunity(
    communityId: string,
    queryParams: QueryParamsPaymentRequestDto,
  ) {
    const {
      sort,
      limit = 10,
      page = 1,
      payments_request_status: status,
      location,
      amount,
      concept,
    } = queryParams;
    let paymetsRequests;
    if (location) {
      paymetsRequests = await this.findByLocation(location);
    } else {
      paymetsRequests = await this.paymentRequestModel.paginate(
        {
          community: communityId,
          ...(status ? { status } : {}),
          ...(amount ? { amount } : {}),
          ...(concept ? { concept } : {}),
        },
        {
          limit,
          page,
          sort: {
            createdAt: sort,
          },
        },
      );
    }

    return paymetsRequests;
  }

  async findOne(id: string) {
    const { includePayments } = { includePayments: true };
    let paymentRequest: any;
    if (includePayments) {
      paymentRequest = await this.findPaymentRequestWithPayments(id);
    } else {
      paymentRequest = await this.paymentRequestModel
        .findOne({ _id: id })
        .select('-payments');
    }

    if (!paymentRequest) throw new NotFoundException();
    return paymentRequest;
  }

  async update(
    id: string,
    updatePaymentsReqquestDto: UpdatePaymentsRequestDto,
  ) {
    const paymentRequest = await this.paymentRequestModel.findOneAndUpdate(
      { _id: id },
      updatePaymentsReqquestDto,
      { new: true },
    );
    if (!paymentRequest) throw new NotFoundException();
    return paymentRequest;
  }

  async remove(id: string) {
    return await this.paymentRequestModel.findOneAndDelete({ _id: id });
  }

  async findPaymentRequestWithPayments(id: string) {
    const paymentRequest = await this.paymentRequestModel
      .findOne({ _id: id })
      .populate({
        path: 'payments',
        populate: {
          path: 'payment',
          select: 'number concept amount currency',
        },
      })
      .populate({
        path: 'payments',
        populate: {
          path: 'location',
          select: 'name _id',
        },
      });

    return paymentRequest;
  }
  async findByLocation(id: string) {
    const paymentsRequest = await this.paymentRequestModel.paginate({
      debts: {
        $all: [new Types.ObjectId(id)],
      },
    });
    return paymentsRequest;
  }
}
