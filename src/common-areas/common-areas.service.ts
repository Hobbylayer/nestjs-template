import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CommonArea } from './entities/common-areas.entity';
import { CreateCommonAreaDto } from './dto/create-common-area.dto';
import { UpdateCommonAreaDto } from './dto/update-common-area.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { PaginateModel, Types } from 'mongoose';

@Injectable()
export class CommonAreasService {
  constructor(
    @InjectModel(CommonArea.name)
    private readonly commonAreaModel: PaginateModel<CommonArea>
  ) { }

  async create(createCommonAreaDto: CreateCommonAreaDto) {
    const exist: boolean = await this.existByName(createCommonAreaDto.name);
    if (exist)
      return new HttpException('That name is already taken', HttpStatus.BAD_REQUEST);

    const data = await this.commonAreaModel.create(createCommonAreaDto);

    return {
      message: 'Common area created successfully',
      data,
    };
  }

  async findByCommunity (communityId: Types.ObjectId) {
    return await this.commonAreaModel.find({ community: communityId });
  }

  async findOne(id: Types.ObjectId) {
    const commonArea = await this.commonAreaModel.findOne({ _id: id }).select('-__v');
    if (!commonArea)
      return []

    return commonArea
  }

  async existByName(name: string): Promise<boolean> {
    const commonArea = await this.commonAreaModel
      .findOne({ name })
      .countDocuments();

    // returns if there is some common area
    return !!commonArea
  }

  async update (id: Types.ObjectId, updateCommonAreaDto: UpdateCommonAreaDto) {
    const result = await this.commonAreaModel.findByIdAndUpdate(id, updateCommonAreaDto);
    if (!result)
      return new HttpException('Common area not found', HttpStatus.NOT_FOUND)

    // refreshing payload to return. For some reason, `result` isn't the
    // updated data, it's the old data.
    return (await this.findOne(id))
  }

  async remove (id: Types.ObjectId) {
    const result = await this.commonAreaModel.findOneAndDelete({ _id: id })
    if (!result)
      return new HttpException('Common area not found', HttpStatus.NOT_FOUND);

    return { message: 'Common area removed successfully!' }
  }
}
