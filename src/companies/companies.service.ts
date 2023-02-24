import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCompanyDto } from './dto/create-company.dto';
import { UpdateCompanyDto } from './dto/update-company.dto';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectModel(Company.name)
    private readonly communityModel: PaginateModel<Company>,
  ) { }

  async create(createCompanyDto: CreateCompanyDto) {
    const exist = await this.existEmail(createCompanyDto.email);
    if (exist)
      return new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
    const totalCompanies = await this.communityModel.find({}).count();
    const code = this.createCode(totalCompanies);
    const data = await this.communityModel.create({
      code,
      ...createCompanyDto,
    });
    return {
      message: 'Community created successfully',
      data,
    };
  }

  async findAll({ limit = 4, page = 1 }: PaginationDto) {
    return await this.communityModel.paginate({}, { page, limit });
  }

  async findOne(id: Types.ObjectId) {
    const community = await this.communityModel
      .findOne({ _id: id })
      .select('-__v');
    if (!community) return [];
    return community;
  }

  async existEmail(email: string) {
    const community = await this.communityModel
      .findOne({ email })
      .countDocuments();
    if (!community) return false;
    return true;
  }

  async update(id: string, UpdateCompanyDto: UpdateCompanyDto) {
    const result = await this.communityModel.findByIdAndUpdate(
      id,
      UpdateCompanyDto,
      { new: true },
    );
    if (!result)
      return new HttpException('Community not found', HttpStatus.NOT_FOUND);
    return result;
  }

  async remove(id: string) {
    const result = await this.communityModel.findOneAndDelete({ _id: id });
    if (!result)
      return new HttpException('Community not found', HttpStatus.NOT_FOUND);
    return {
      message: 'Community deleted successfully',
    };
  }

  async activate(id: string) {
    const result = await this.communityModel.findByIdAndUpdate(
      id,
      { status: 'active' },
      { new: true },
    );
    if (!result)
      return new HttpException('Community not found', HttpStatus.NOT_FOUND);
    return result;
  }
  async deactivate(id: string) {
    const result = await this.communityModel.findByIdAndUpdate(
      id,
      { status: 'deactive' },
      { new: true },
    );
    if (!result)
      return new HttpException('Community not found', HttpStatus.NOT_FOUND);
    return result;
  }
  createCode(totalRegisters) {
    const code = totalRegisters + 1;
    const codeString = code.toString();
    const codeLength = codeString.length;
    let codeStringPadded = '';
    for (let i = 0; i < 4 - codeLength; i++) {
      codeStringPadded += '0';
    }
    return codeStringPadded + codeString;
  }
  handleExeption(error: Error) { }
}
