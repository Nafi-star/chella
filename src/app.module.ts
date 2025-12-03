import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TransactionsModule } from './transactions/transactions.module';


import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { ReferralsModule } from './referrals/referrals.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({

  imports:
[
  MongooseModule.forRoot("mongodb+srv://naifewande_db_user:WUJWhiRFMu5XC8Xn@chella.uvmzwfs.mongodb.net/?appName=chella"),

  
 UsersModule, TasksModule, TransactionsModule, ExchangeRatesModule, ReferralsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
