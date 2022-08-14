import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt'
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { StatusUser } from './enums/users.enums';

@Injectable()
export class UsersService {

  private readonly saltRounds = 10;

  constructor(
    @InjectModel(User.name)
    readonly userModel: PaginateModel<User>
  ) { }

  async create(createUserDto: CreateUserDto) {
    //TODO validate that email is unique
    const hash = await bcrypt.hash(createUserDto.password, this.saltRounds);
    await this.userModel.create({ ...createUserDto, password: hash });
    return {
      message: 'User created successfully'
    }
  }

  findAll() {
    return `This action returns all users`;
  }

  async findAllByCommunityId(id: string, paginationDto: PaginationDto) {
    return await this.userModel.paginate({ community: id }, paginationDto);
  }

  async findOne(id: string) {
    const result = await this.userModel.findById(id);
    if (!result) return { message: 'User not found', doc: [] }
    return result;
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
    await this.userModel.findByIdAndUpdate(id, { status: StatusUser.ACTIVE })
    return {
      message: 'User activated successfully'
    }
  }

  async disable(id: String) {
    await this.userModel.findByIdAndUpdate(id, { status: StatusUser.DISABLED })
    return {
      message: 'User disable successfully'
    }
  }
}
