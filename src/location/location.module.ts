import { Module } from '@nestjs/common';
import { LocationService } from './location.service';
import { LocationController } from './location.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { LocationSchema, Location } from './entities/location.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';
@Module({
  controllers: [LocationController],
  providers: [LocationService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Location.name,
        useFactory: () => {
          const schema = LocationSchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
})
export class LocationModule {}
