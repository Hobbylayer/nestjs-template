import { Module } from '@nestjs/common';
import { BanksService } from './banks.service';
import { BanksController } from './banks.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Bank, BanksSchema } from './entities/bank.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2'

@Module({
  controllers: [BanksController],
  providers: [BanksService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Bank.name,
        useFactory: () => {
          const schema = BanksSchema
          schema.plugin(mongoosePaginate)
          return schema
        }
      }
    ]),
  ]
})
export class BanksModule { }
