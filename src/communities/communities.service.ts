import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel, Types } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateCommunityDto } from './dto/create-community.dto';
import { UpdateCommunityDto } from './dto/update-community.dto';
import { Community } from './entities/community.entity';

@Injectable()
export class CommunitiesService {

  constructor(
    @InjectModel(Community.name)
    private readonly communityModel: PaginateModel<Community>
  ) { }

  async create(createCommunityDto: CreateCommunityDto) {

    const exist = await this.existEmail(createCommunityDto.email)
    if (exist) return new HttpException('Email already exists', HttpStatus.BAD_REQUEST)
    const data = await this.communityModel.create(createCommunityDto)
    return {
      message: 'Community created successfully',
      data
    }

  }

  async findAll({ limit = 4, page = 1 }: PaginationDto) {
    return await this.communityModel.paginate({}, { page, limit })
  }

  async findOne(id: Types.ObjectId) {
    const community = await this.communityModel.findOne({ _id: id }).select('-__v')
    if (!community) return []
    return community
  }

  async existEmail(email: string) {
    const community = await this.communityModel.findOne({ email }).countDocuments()
    if (!community) return false
    return true
  }

  async update(id: string, updateCommunityDto: UpdateCommunityDto) {
    const result = await this.communityModel.findByIdAndUpdate(id, updateCommunityDto, { new: true })
    if (!result) return new HttpException('Community not found', HttpStatus.NOT_FOUND)
    return result
  }

  async remove(id: string) {
    const result = await this.communityModel.findOneAndDelete({ _id: id })
    if (!result) return new HttpException('Community not found', HttpStatus.NOT_FOUND)
    return {
      message: 'Community deleted successfully',
    }
  }

  async activate(id: string) {
    const result = await this.communityModel.findByIdAndUpdate(id, { status: 'active' }, { new: true })
    if (!result) return new HttpException('Community not found', HttpStatus.NOT_FOUND)
    return result
  }
  async deactivate(id: string) {
    const result = await this.communityModel.findByIdAndUpdate(id, { status: 'deactive' }, { new: true })
    if (!result) return new HttpException('Community not found', HttpStatus.NOT_FOUND)
    return result
  }

  handleExeption(error: Error) { }
}
