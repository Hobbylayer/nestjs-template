import { Injectable } from '@nestjs/common';
import { CreatePaymethodDto } from './dto/create-paymethod.dto';
import { UpdatePaymethodDto } from './dto/update-paymethod.dto';

@Injectable()
export class PaymethodsService {
  create(createPaymethodDto: CreatePaymethodDto) {
    return 'This action adds a new paymethod';
  }

  findAll() {
    return `This action returns all paymethods`;
  }

  findOne(id: number) {
    return `This action returns a #${id} paymethod`;
  }

  update(id: number, updatePaymethodDto: UpdatePaymethodDto) {
    return `This action updates a #${id} paymethod`;
  }

  remove(id: number) {
    return `This action removes a #${id} paymethod`;
  }
}
