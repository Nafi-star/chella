import { BadRequestException, Injectable } from "@nestjs/common";
import { Referral } from "../schemas/referrals.schema";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ReferralService{
  constructor(
    @InjectModel(Referral.name)
    private readonly referralModel:Model<Referral>,
  ){}
  async createReferralTracking(
    referredId:string,
    referredUserId:string
  )
  {
  if(referredId ===referredUserId ){
    throw new BadRequestException("user cannnot refer themself")
  };
  const refExists=await this.referralModel.exists({
    referredUserId:referredUserId
  });
if(refExists){
  throw new BadRequestException("user already referred")
}
const referral =await this.referralModel.create({
  referredId:referredId,
  referredUserId:referredUserId
});
return referral.save()
  }
}