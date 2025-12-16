import { Module } from '@nestjs/common';
import { ReferralService } from './services/refferals.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Referral, referralSchema } from './schemas/referrals.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Referral.name, schema: referralSchema }
    ])
  ],
  controllers: [],
  providers: [ReferralService],
  exports: [ReferralService]
})
export class ReferralsModule {}
