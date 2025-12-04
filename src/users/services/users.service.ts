import { Injectable, BadRequestException, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from '../dto/users.dto';
import { UserProfileResponse } from '../responses/users.response';
import { User } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CommonUtils } from '../commons/utils';


@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name)
   private readonly userModel:Model<User>){}
 
 async registerUser(registerDto: RegisterUserDto){
  console.log("coming requesr") 
  const existingUser=await this.userModel.findOne({
    username:registerDto.username.toLowerCase()
  });
  console.log("existing name",existingUser)
  if(existingUser){
    throw new BadRequestException("username already existing");
  }
  const hashedPwd= await bcrypt.hash(registerDto.password,10);
  const refferalCode= CommonUtils.generateReferralCode();
  
  if (registerDto.refferedBy){
    const refferingUser = await this.userModel.findOne({
      referralCode:registerDto.refferedBy
    });
    if(refferingUser){
      await this.userModel.findByIdAndUpdate(
        refferingUser._id,{
          totalEarned:refferingUser.totalEarned + 20,
          amount:refferingUser.amount +20,
          totalreferred:refferingUser.totalreferred
        }
        
      );

    }

  
  }
  const newUser =new this.userModel({
    fullname:registerDto.fullname,
    username:registerDto.fullname,
    password:hashedPwd,
    referralCode:refferalCode,
    referredBy:registerDto.refferedBy || null,
    amount:100,
    totalEarned:100,
    totalReferred:0
  
  })
  const savedUser =await newUser.save();
  const userProfileResponse:UserProfileResponse ={
    id:savedUser._id.toString(),
    fullname :savedUser.fullname,
    username:savedUser.username,
    referralCode:savedUser.referralCode,
    referredBy:savedUser.referredBy,
    amount:savedUser.amount,
    totalEarned:savedUser.totalEarned,
    totalReferred:savedUser.totalEarned


    
  }
 
  return userProfileResponse;
}

}

 
   
    

  

  

