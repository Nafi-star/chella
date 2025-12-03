import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

 
  @Schema({timestamps:true})
  export class User extends Document{
   @Prop()
fullname:string;
   @Prop()
username:string;
   @Prop()
referredBy:string;
   @Prop()
referralCode:string;
   @Prop()
amount:string;
   @Prop()
totalEarned:string;
   @Prop()
totalreferres:string;

}
export const userSchema=SchemaFactory.createForClass(User);