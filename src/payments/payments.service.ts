import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, PaginateModel, Types } from 'mongoose';
import { PaymentsRequest } from 'src/payments-requests/entities/payments-request.entity';
import { CreatePaymentDto } from './dto/create-payment.dto';
import {
  DateSearchType,
  QueryParamsPayments,
} from './dto/query-params-payments.dto';
import { UpdatePaymentDto } from './dto/update-payment.dto';
import { Payment } from './entities/payment.entity';
import { KindPayment, PaymentStatus } from './enums/enums.payments';

@Injectable()
export class PaymentsService {
  constructor(
    @InjectModel(Payment.name)
    readonly paymentModel: PaginateModel<Payment>,
    @InjectModel(PaymentsRequest.name)
    readonly paymentRequestModel: Model<PaymentsRequest>,
  ) { }

  async create(createPaymentDto: CreatePaymentDto) {
    const { community, kind, paymethod } = createPaymentDto;

    if (kind === KindPayment.EXPENSE) {
      this.expenseValidate(createPaymentDto);
    }

    if (kind === KindPayment.INCOME) {
      this.incomeValidate(createPaymentDto);
    }

    const totalPayment = await this.paymentModel
      .find({
        $and: [{ community }, { kind }],
      })
      .count();

    const number = this.createNumbering(totalPayment);

    try {
      const payment = await this.paymentModel.create({
        number,
        ...createPaymentDto,
      });

      return payment;
    } catch (error) {
      console.log(error);
    }
  }

  async findAllByCommunity(id: string, queryParams: QueryParamsPayments) {
    const {
      limit = 10,
      page = 1,
      sort = 'ASC',
      location,
      resident,
      payment_status: status,
      number,
      includeAllField = false,
      fields,
      kind,
      description,
      startDate,
      endDate,
      findDateBy,
      residentId,
      referenceCode
    } = queryParams;

    const findByCreateAt = () => {
      return {
        createAt: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    };
    const findByPaymentDate = () => {
      return {
        date: {
          $gte: startDate,
          $lte: endDate,
        },
      };
    };

    const findDateByDateRange = (kind: DateSearchType) => {
      if (kind === DateSearchType.CREATE_AT_DATE) {
        return findByCreateAt();
      }
      if (kind === DateSearchType.PAYMENT_DATE) {
        return findByPaymentDate();
      }
    };
    const payments = await this.paymentModel.paginate({
      community: id,
      ...(resident ? { resident } : {}),
      ...(kind ? { kind } : {}),
      ...(number ? { number } : {}),
      ...(location ? { location } : {}),
      ...(status ? { status } : {}),
      ...(Boolean(referenceCode) && { referenceCode }),
      ...(Boolean(description)? { description: new RegExp(description, 'i') } : {}),
      ...(findDateBy ? {
        ...findDateByDateRange(findDateBy)
      } : {}
      ),
      ...(residentId && { resident: residentId })
    },
      {
        limit,
        page,
        sort: {
          createdAt: sort.toLocaleUpperCase(),
        },
        ...(includeAllField
          ? {}
          : {
            select: 'date number kind amount referenceCode status' + fields,
          }),
        ...(fields
          ? {
            populate: {
              path: fields.replace(',', ' '),
              select: 'name dni email phone',
            },
          }
          : {}),
      },
    );
    if (!payments) throw new BadRequestException();
    return payments;
  }

  async findOne(id: string, queryParams: QueryParamsPayments) {
    const { fields } = queryParams;
    const payment = await this.paymentModel
      .findOne({ _id: id })
      .populate(fields.replace(',', ' '), 'name');

    if (!payment) throw new NotFoundException();
    return payment;
  }

  async update(id: string, updatePaymentDto: UpdatePaymentDto) {
    try {
      const payment = await this.paymentModel.findOneAndUpdate(
        { _id: id },
        updatePaymentDto,
        { new: true },
      );
      if (!payment) throw new BadRequestException('payment no registed');
      return payment;
    } catch (error) {
      this.errorHandler(error);
    }
  }

  async remove(id: string) {
    try {
      await this.paymentModel.findOneAndDelete({ _id: id });
      return {
        message: 'Payment deleted',
      };
    } catch (error) {
      this.errorHandler(error);
    }
  }

  //TODO que pueda recibir un array de string por si el pago se hace en diferentes partes
  async reconciliate(id: string) {
    const payment = await this.paymentModel.findOne({ _id: id });

    if (!payment) throw new BadRequestException('This payment no registered');
    if (payment.kind === KindPayment.EXPENSE)
      throw new BadRequestException('Payment is expense, only accept income');
    if (payment.status === PaymentStatus.APPROVED)
      throw new BadRequestException('This payment already reconciliate');

    const paymentRequest = await this.paymentRequestModel.findOne({
      _id: new Types.ObjectId(payment.paymentRequest),
    });
    //TODO Si la moneda es diferente a la moneda principal hace la conversion a moenda principal
    /*
     * Valida que el monto del pago sea igual al monto de la solicitud de pago
     */
    // if (paymentRequest.amount !== payment.amount) throw new BadRequestException('El monto a conciliar no coincide con la deuda')

    const debts = paymentRequest.debts
      .map((debt) => debt.toString())
      .filter((debt) => debt !== payment.location.toString())
      .map((debt) => new Types.ObjectId(debt));

    paymentRequest.debts = debts;
    paymentRequest.payments.push({
      //@ts-ignore
      payment: payment._id,
      location: payment.location.toString(),
    });

    await this.paymentRequestModel.findOneAndUpdate(
      {
        _id: payment.paymentRequest,
      },
      paymentRequest,
    );

    this.update(id, { status: PaymentStatus.APPROVED });

    return {
      message: 'Pago conciliado correctamente',
      payment: payment,
    };
  }

  createNumbering(totalPayment) {
    const payment = totalPayment + 1;
    const paymentNumberString = payment.toString();
    const paymentNumberLength = paymentNumberString.length;
    let paymentNumberStringPadded = '';
    for (let i = 0; i < 6 - paymentNumberLength; i++) {
      paymentNumberStringPadded += '0';
    }
    return paymentNumberStringPadded + paymentNumberString;
  }

  errorHandler(error: any) {
    if (error.name === 'CastError') throw new BadRequestException(error);
    throw new InternalServerErrorException(error);
  }
  incomeValidate({
    resident,
    location,
    referenceCode,
    status,
    paymethod,
  }: CreatePaymentDto) {
    if (!resident) throw new BadRequestException('Resident is required');
    if (!location) throw new BadRequestException('Locations is required');
    if (!referenceCode && paymethod !== 'cash')
      throw new BadRequestException('referenceCode is required');
    if (status) {
      if (status !== PaymentStatus.PENDING)
        throw new BadRequestException(
          'Payment only must to create with pending status',
        );
    }
  }

  expenseValidate({ status }: CreatePaymentDto) {
    //TODO activate whe contact module is already
    // if (!contact) throw new BadRequestException('Contact is required')
    if (status !== PaymentStatus.APPROVED)
      throw new BadRequestException('Status is required');
  }
}
