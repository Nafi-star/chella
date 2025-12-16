import { Module } from '@nestjs/common';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './schemas/users.schema';
import { ReferralsModule } from 'src/referrals/referrals.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {name: User.name, schema: userSchema}
    ]),
    ReferralsModule
  ],
  
  controllers: [UsersController],
  providers: [UsersService]
})
export class UsersModule {}
