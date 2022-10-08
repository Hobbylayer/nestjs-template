import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserStatus } from './enums/users.enums';
import { UsersQueryOptionsDto } from './dto/query-options.dto';

@Injectable()
export class UsersService {
  private readonly saltRounds = 10;

  constructor(
    @InjectModel(User.name)
    private readonly userModel: PaginateModel<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    const emailAndDniExist = await this.userModel.findOne({
      $or: [{ email: createUserDto.email }, { dni: createUserDto.dni }],
    })
    if (emailAndDniExist) throw new BadRequestException(`Email: ${createUserDto.email} or Dni: ${createUserDto.dni}already register`)

    const hash = await bcrypt.hash(createUserDto.password, this.saltRounds);
    await this.userModel.create({ ...createUserDto, password: hash });
    return {
      message: 'User created successfully'
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findAllByCommunityId(id: string, queryOptionsDto: UsersQueryOptionsDto) {
    const { limit = 10, page = 1, name, dni, includeLocation = false } = queryOptionsDto;

    return await this.userModel.paginate(
      {
        community: id,
        ...(dni ? { dni } : {}),
        ...(name ? { name: new RegExp(name, 'i') } : {}),
      },
      {
        limit,
        page,
        select: '-__v',
        ...(includeLocation ? {
          populate: {
            path: 'location',
            select: 'name _id'
          }
        } : {})

      }
    )
  }

  async findOne(id: string) {
    const result = await this.userModel.findById(id);
    if (!result) return { message: 'User not found', doc: [] }
    return result;
  }

  async findOneByEmail(email: string) {
    const user = await this.userModel.findOne({ email, status: UserStatus.ACTIVE }).select('_id name email password roles')
    return user
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const result = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).select('-__v');
    return result;
  }

  async remove(id: string) {
    await this.userModel.findByIdAndDelete(id)
    return {
      message: 'User removed successfully'
    }
  }

  async activate(id: string) {
    await this.userModel.findByIdAndUpdate(id, { status: UserStatus.ACTIVE })
    return {
      message: 'User activated successfully'
    }
  }

  async disable(id: String) {
    await this.userModel.findByIdAndUpdate(id, { status: UserStatus.DISABLED })
    return {
      message: 'User disable successfully'
    }
  }
  /**
   * 
   * @param id User id
   * @returns Session with community, location info
   */
  async self(id: string) {
    const result = await this.userModel.findById(id).populate('community location')
    const user = {
      _id: result._id,
      name: result.name,
      lastName: result.lastName,
      phone: result.phone,
      email: result.email,
      dni: result.dni,
      roles: result.roles,
    }
    return {
      user,
      community: result.community,
      location: result.location,
    }
  }
}
