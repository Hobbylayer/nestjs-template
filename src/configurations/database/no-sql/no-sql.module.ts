import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import configuration from './configuration';
import { NoSqlService } from './no-sql.service';

@Module({
  imports: [ConfigModule.forRoot({ load: [configuration] })],
  providers: [ConfigService, NoSqlService],
  exports: [ConfigService, NoSqlService],
})
export class NoSqlModule {}
