import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateNewsDto } from './dto/create-news.dto';
import { UpdateNewsDto } from './dto/update-news.dto';
import { New } from './entities/news.entity';

@Injectable()
export class NewsService {

  constructor(
    @InjectModel(New.name)
    private readonly newModel: PaginateModel<New>
  ) { }

  async create(createNewsDto: CreateNewsDto) {
    try {
      await (await this.newModel.create(createNewsDto))

      return {
        message: 'News created succesfully'
      }
    } catch (error) {
      throw new BadRequestException('Opss algo salio mal')
    }

  }

  async findByCommunity(communityId: string, paginationDto: PaginationDto) {
    const {
      limit = 10,
      page = 1,
      sort = 'DESC',
      status
    } = paginationDto
    const result = await this.newModel.paginate(
      {
        community: communityId,
        ...(status ? { status } : {})
      },
      {
        limit,
        page,
        sort: {
          createdAt: sort
        },
        select: '-__v'
      },
    )

    return result
  }

  async findOne(id: string) {
    const result = await this.newModel.findOne({
      _id: id
    })

    if (!result) throw new NotFoundException('No encontrado')
    return result
  }

  async update(id: string, updateNewsDto: UpdateNewsDto) {
    const result = await this.newModel.findByIdAndUpdate(id, updateNewsDto, { new: true }).select('-__v')

    return {
      message: 'New updated',
      result
    }
  }

  async remove(id: string) {
    const result = await this.newModel.findByIdAndDelete(id)
  }

  activate(id: string) {
    return 'activated'
  }

  inactivate(id: string) {
    return 'inactivated'
  }
}
