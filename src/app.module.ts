import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';
import { TransactionsModule } from './transactions/transactions.module';


import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { ReferralsModule } from './referrals/referrals.module';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './users/commons/guards/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
@Module({

  imports:
[
  ConfigModule.forRoot({
    isGlobal:true,
  }),
  MongooseModule.forRoot(process.env.MONGO_URI||""),
  PassportModule,

  
 UsersModule, TasksModule, TransactionsModule, ExchangeRatesModule, ReferralsModule],
  controllers: [AppController],
  providers: [AppService, JwtStrategy],
})
export class AppModule {}
