import { Injectable } from '@nestjs/common';
import { CreatePaymentsRequestDto } from './dto/create-payments-request.dto';
import { UpdatePaymentsRequestDto } from './dto/update-payments-request.dto';

@Injectable()
export class PaymentsRequestsService {
  create(createPaymentsRequestDto: CreatePaymentsRequestDto) {
    return 'This action adds a new paymentsRequest';
  }

  findAll() {
    return `This action returns all paymentsRequests`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymentsRequest`;
  }

  update(id: number, updatePaymentsRequestDto: UpdatePaymentsRequestDto) {
    return `This action updates a #${id} paymentsRequest`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymentsRequest`;
  }
}
