import { Module } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { NotificationsController } from './notifications.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Notification, NotificationsSchema } from './schemas/notification.schema';

import * as mongoosePaginate from 'mongoose-paginate-v2';
import { Community, CommunitySchema } from 'src/communities/entities/community.entity';

@Module({
  controllers: [NotificationsController],
  providers: [NotificationsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Notification.name,
        useFactory: () => {
          const schema = NotificationsSchema;
          schema.plugin(mongoosePaginate);
          return schema
        }
      }
    ]),
    MongooseModule.forFeatureAsync([
      {
        name: Community.name,
        useFactory: () => {
          const schema = CommunitySchema
          schema.plugin(mongoosePaginate)
          return schema
        }
      }
    ])
  ]
})
export class NotificationsModule { }
