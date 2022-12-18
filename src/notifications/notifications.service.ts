import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose';
import { Community } from 'src/communities/entities/community.entity';
import { Notification } from './schemas/notification.schema';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { QueryParamsNotifications } from './dto/query-params-notifications';
import { UpdateNotificationDto } from './dto/update-notification.dto';

@Injectable()
export class NotificationsService {

  constructor(
    @InjectModel(Notification.name)
    readonly notificationModel: PaginateModel<Notification>,
    @InjectModel(Community.name)
    readonly communityModel: PaginateModel<Community>,
  ) { }

  async create(createNotificationDto: CreateNotificationDto, queryParamsNotifications: QueryParamsNotifications) {
    const { status = 'active' } = queryParamsNotifications
    try {
      const communities = await this.communityModel.find({ status })
      const notificationsPromise = communities.map((community) => {
        return this.notificationModel.create({
          ...createNotificationDto,
          community: community._id,
        })
      })

      await Promise.all(notificationsPromise)

      return {
        message: 'Notifications created successfully',
      }

    } catch (err) {
      this.errorHandling(err)
    }
  }

  findAll() {
    return `This action returns all notifications`;
  }

  findOne(id: string) {
    return `This action returns a #${id} notification`;
  }

  update(id: string, updateNotificationDto: UpdateNotificationDto) {
    return `This action updates a #${id} notification`;
  }

  remove(id: string) {
    return `This action removes a #${id} notification`;
  }
  errorHandling(err: any) {
    if (err.name === 'MongoError' && err.code === 11000) {
      new BadRequestException('This notification already exists')
    }
    return {
      status: 500,
      message: err.message,
    };
  }
}
