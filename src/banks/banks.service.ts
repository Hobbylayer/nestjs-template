import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { STATUS_DOCUMENT } from 'src/common/enums/common.enums';
import { CreateBankDto } from './dto/create-bank.dto';
import { UpdateBankDto } from './dto/update-bank.dto';
import { Bank } from './entities/bank.entity';

@Injectable()
export class BanksService {
  constructor(
    @InjectModel(Bank.name)
    readonly bankModel: PaginateModel<Bank>,
  ) {}
  async create(createBankDto: CreateBankDto) {
    const name = createBankDto.name.toLocaleLowerCase();
    const exist = await this.findByName(name, createBankDto.community);
    if (exist) {
      throw new BadRequestException(
        'Nombre del banco ya se encuentra registrado',
      );
    }
    const bank = await this.bankModel.create({
      ...createBankDto,
      name,
    });
    return bank;
  }
  //TODO limitar el numero de registros dependiendo del plan
  async findAll(communityId: string, queryParams: PaginationDto) {
    const { limit = 15, page = 1, name, status } = queryParams;
    return await this.bankModel.paginate(
      {
        community: communityId,
        ...(name ? { name: name.toLowerCase() } : {}),
        ...(status ? { status } : {}),
      },
      { limit, page },
    );
  }

  async findOne(id: string) {
    return await this.bankModel.findOne({ _id: id });
  }

  async findByName(name: string, community) {
    const bankAccount = await this.bankModel.findOne({
      $and: [{ name }, { community }],
    });
    return bankAccount;
  }
  /*
   * El balance no se puede cambiar
   */
  async update(id: string, { balance, ...rest }: UpdateBankDto) {
    return await this.bankModel.findOneAndUpdate({ _id: id }, rest, {
      new: true,
    });
  }
  /*
   * Si ya tiene transacciones conciliadas (aprovadas) no se puede eliminar
   */
  async remove(id: string) {
    const bank = await this.bankModel.findOneAndUpdate(
      { _id: id },
      { status: STATUS_DOCUMENT.INACTIVE },
      { new: true },
    );
    return bank;
  }
}
