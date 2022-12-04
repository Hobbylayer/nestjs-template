import { Module } from '@nestjs/common';
import { NewsService } from './news.service';
import { NewsController } from './news.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { New, NewSchema } from './entities/news.entity';
import * as moongoosePaginate from 'mongoose-paginate-v2';

@Module({
  controllers: [NewsController],
  providers: [NewsService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: New.name,
        useFactory: () => {
          const schema = NewSchema;
          schema.plugin(moongoosePaginate);

          return schema;
        },
      },
    ]),
  ],
})
export class NewsModule {}
