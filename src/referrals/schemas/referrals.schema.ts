import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Type } from "class-transformer";

import { Document, Types } from "mongoose";

 import { User } from "src/users/schemas/users.schema";
  @Schema({timestamps:true})
  export class Referral extends Document{
   @Prop({type:Types.ObjectId,ref:User.name})
   referredId:Types.ObjectId;
  @Prop({type:Types.ObjectId,ref:User.name})
referredUserId:Types.ObjectId;
}
export const referralSchema=SchemaFactory.createForClass(Referral);
