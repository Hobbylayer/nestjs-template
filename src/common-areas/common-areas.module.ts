import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CommonAreasController } from './common-areas.controller';
import { CommonAreasService } from './common-areas.service';
import { CommonArea, CommonAreaSchema } from './entities/common-areas.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  controllers: [CommonAreasController],
  providers: [CommonAreasService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: CommonArea.name,
        useFactory: () => {
          const schema = CommonAreaSchema
          schema.plugin(mongoosePaginate)
          return schema
        }
      }
    ])
  ]
})
export class CommonAreasModule {}
