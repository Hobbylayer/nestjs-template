import { HttpException, HttpStatus, Injectable, InternalServerErrorException } from '@nestjs/common';
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

    try {
      const data = await this.communityModel.create(createCommunityDto)
      return {
        message: 'Community created successfully',
        data
      }
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll({ limit = 4, page = 1 }: PaginationDto) {
    try {
      return await this.communityModel.paginate({}, { page, limit })
    } catch (error) {
      throw new InternalServerErrorException
    }
  }

  async findOne(id: Types.ObjectId) {
    try {
      const community = await this.communityModel.findOne({ _id: id }).select('-__v')
      if (!community) return []
      return community
    } catch (error) {
      throw new InternalServerErrorException
    }
  }

  async existEmail(email: string) {
    try {
      const community = await this.communityModel.findOne({ email }).countDocuments()
      if (!community) return false
      return true
    } catch (error) {
      throw new InternalServerErrorException
    }
  }

  update(id: string, updateCommunityDto: UpdateCommunityDto) {
    return `This action updates a #${id} community`;
  }

  async remove(id: string) {
    await this.communityModel.findOneAndDelete({ _id: id })
    return {
      message: 'Community deleted successfully',
    }
  }

  async activate(id: string) {
    return 'This action activates a community'
  }
  async deactivate(id: string) {
    return 'This action deactivates a community'
  }

  handleExeption(error: Error) { }
}
