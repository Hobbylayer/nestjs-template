import { Module } from '@nestjs/common';
import { CompanyService } from './companies.service';
import { CompanyController } from './companies.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Company, CompanySchema } from './entities/company.entity';
import * as mongoosePaginate from 'mongoose-paginate-v2';

@Module({
  controllers: [CompanyController],
  providers: [CompanyService],
  imports: [
    MongooseModule.forFeatureAsync([
      {
        name: Company.name,
        useFactory: () => {
          const schema = CompanySchema;
          schema.plugin(mongoosePaginate);
          return schema;
        },
      },
    ]),
  ],
})
export class CompaniesModule { }
