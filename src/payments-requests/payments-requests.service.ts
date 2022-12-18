import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
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
  ) { }

  async create(createPaymentsRequestDto: CreatePaymentsRequestDto, queryParams: QueryParamsPaymentRequestDto) {
    const { community, locations } = createPaymentsRequestDto;
    const all_locations = queryParams.fields.includes('all_locations')
    console.log(all_locations)

    if (all_locations) {
      console.log(all_locations)
      if (Boolean(locations)) throw new BadRequestException('You can not select locations if you select all locations')

      let communityLocations = await this.locationModel
        .find({ community, status: STATUS_DOCUMENT.ACTIVE })
        .select('_id name');
      communityLocations = communityLocations.map(({ _id }) => _id);

      return await this.paymentRequestModel.create({
        ...createPaymentsRequestDto,
        debts: communityLocations,
      });
    }

    if (!all_locations && locations.length === 0) throw new BadRequestException('You must select at least one location')

    const locationsVerified = locations.map(item => this.existLocation(item))
    const locationsVerifiedResult = await Promise.all(locationsVerified)
    if (locationsVerifiedResult.includes(false)) new BadRequestException('One or more locations does not exist')

    return await this.paymentRequestModel.create({
      ...createPaymentsRequestDto,
      debts: createPaymentsRequestDto.locations
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
  async existLocation(locationId) {
    const location = await this.locationModel.findById(locationId, { status: STATUS_DOCUMENT.ACTIVE }).count()
    return Boolean(location)
  }
}
