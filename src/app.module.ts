import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ThrottlerModule } from '@nestjs/throttler';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NoSqlModule } from './configurations/database/no-sql/no-sql.module';
import { NoSqlService } from './configurations/database/no-sql/no-sql.service';
import { ApplicationModule } from './configurations/application/application.module';
import { ApplicationService } from './configurations/application/application.service';
import { UsersModule } from './users/users.module';
import { CommunitiesModule } from './communities/communities.module';
import { PaymentsModule } from './payments/payments.module';
import { LocationModule } from './location/location.module';
import { PaymentsRequestsModule } from './payments-requests/payments-requests.module';
import { NotificationsModule } from './notifications/notifications.module';
import { QuestbookModule } from './questbook/questbook.module';
import { VotesModule } from './votes/votes.module';
import { ReportsModule } from './reports/reports.module';
import { BanksModule } from './banks/banks.module';
import { CommonAreasModule } from './common-areas/common-areas.module';
import { DebtorsModule } from './debtors/debtors.module';

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
    UsersModule,
    CommunitiesModule,
    PaymentsModule,
    LocationModule,
    PaymentsRequestsModule,
    NotificationsModule,
    QuestbookModule,
    VotesModule,
    ReportsModule,
    BanksModule,
    CommonAreasModule,
    DebtorsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
