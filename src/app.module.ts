import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoSqlModule } from './configurations/database/no-sql/no-sql.module';
import { NoSqlService } from './configurations/database/no-sql/no-sql.service';
import { ApplicationModule } from './configurations/application/application.module';
import { ApplicationService } from './configurations/application/application.service';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [NoSqlModule],
      useFactory: async (mongodb: NoSqlService) => ({
        uri: mongodb.uri,
      }),
      inject: [NoSqlService],
    }),
    ThrottlerModule.forRootAsync({
      imports: [ApplicationModule],
      useFactory: (appConfig: ApplicationService) => ({
        ttl: appConfig.throttleTTL,
        limit: appConfig.throttleLimit,
      }),
      inject: [ApplicationService],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
