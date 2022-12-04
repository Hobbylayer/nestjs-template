import { Module } from '@nestjs/common';
import { CommunitiesService } from './communities.service';
import { CommunitiesController } from './communities.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Community, CommunitySchema } from './entities/community.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  controllers: [CommunitiesController],
  providers: [CommunitiesService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Community.name,
        useFactory: () => {
          const schema = CommunitySchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
})
export class CommunitiesModule {}
