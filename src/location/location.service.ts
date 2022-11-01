import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CreateLocationDto } from './dto/create-location.dto';
import { UpdateLocationDto } from './dto/update-location.dto';
import { Location } from './entities/location.entity';
import { LocationsStatus } from './enums/locations.enums';

@Injectable()
export class LocationService {
  constructor(
    @InjectModel(Location.name)
    private readonly locationModel: PaginateModel<Location>,
  ) { }

  async create(createLocationDto: CreateLocationDto) {
    const result = await this.existLocation(
      createLocationDto.community,
      createLocationDto.name,
    );

    if (result)
      throw new BadRequestException([
        `Location with name ${createLocationDto.name} is already registerd`,
      ]);
    const location = await this.locationModel.create(createLocationDto);
    return location;
  }

  async findAllByCommunityId(id: string, paginationDto: PaginationDto) {
    const { limit = 1, page = 1, sort = 'ASC' } = paginationDto;
    return await this.locationModel.paginate(
      {
        $and: [{ community: id }, { status: LocationsStatus.ACTIVE }],
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

  async findOneById(id: string) {
    const result = await this.locationModel.findOne({ _id: id })

    if (!result) throw new NotFoundException('Locations no encontrada')

    return result
  }

  async findByName(communityId: string, name: string) {
    const result = await this.locationModel.paginate({
      $and: [{ name: new RegExp(name, 'i') }, { community: communityId }],
    });
    if (!result) throw new NotFoundException('Location not found');
    return result;
  }

  private async existLocation(communityId, name) {
    const result = await this.locationModel.findOne({
      $and: [{ name }, { community: communityId }],
    });
    if (result) return true;
    return false;
  }

  async update(id: string, updateLocationDto: UpdateLocationDto) {
    return await this.locationModel.findByIdAndUpdate(
      id,
      {
        name: updateLocationDto.name,
        residentId: updateLocationDto.residentId
      },
      { new: true },
    );
  }

  async remove(id: string) {
    await this.locationModel.findByIdAndRemove(id);
    return {
      message: 'Location has been deleted',
    };
  }
}
