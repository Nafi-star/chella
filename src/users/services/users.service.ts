import { Injectable, BadRequestException, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { RegisterUserDto,  UpdateUserDto,UserLoginDto} from '../dto/users.dto';
import { UserProfileResponse } from '../responses/users.response';
import { User } from '../schemas/users.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { CommonUtils } from '../commons/utils';
import { access } from 'fs';
import { Referral } from 'src/referrals/schemas/referrals.schema';
import { ReferralService } from 'src/referrals/services/refferals.service';


@Injectable()
export class UsersService {
   constructor(@InjectModel(User.name)
   private readonly userModel:Model<User>,
   private readonly referralService:ReferralService
 ){}
 async registerUser(registerDto: RegisterUserDto){
  console.log("coming requesr") 
  const existingUser=await this.userModel.findOne({
    username:registerDto.username.toLowerCase()
  });
  console.log("existing name",existingUser)
  if(existingUser){
    throw new BadRequestException("username already existing");
  }
  let referringUser=null as any;
          if (registerDto.referredBy) {
            referringUser = await this.userModel.findOne({ referralCode: registerDto.referredBy});

            if (!referringUser) {
                throw new BadRequestException('Invalid referral code.');
            }
        }

  const hashedPwd= await bcrypt.hash(registerDto.password,10);
  const refferalCode= CommonUtils.generateReferralCode();

  const newUser =new this.userModel({
    fullname:registerDto.fullname,
    username:registerDto.fullname,
    password:hashedPwd,
    referralCode:refferalCode,
    referredBy:registerDto.referredBy || null,
    amount:100,
    totalEarned:100,
    totalReferred:0
  
  })
  const savedUser =await newUser.save();
  if(referringUser){
        await this.referralService.createReferralTracking(
        referringUser._id.toString(),
        savedUser._id.toString());
        await this.userModel.findByIdAndUpdate(referringUser._id, {
          totalEarned: referringUser.totalEarned + 20,
          amount: referringUser.amount + 20,
          totalReffered: referringUser.totalReffered + 1
      });
        }
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



async updateUser(id:string,updateUserDto:UpdateUserDto){
 const user =await  this.userModel.findById(id);
 if(!user){
  throw new BadRequestException("user not found")
 }
if(updateUserDto.fullname){
  user.fullname=updateUserDto.fullname;
 

}
if (updateUserDto.username){
  const existingUsername=await this.userModel.findOne({ username:UpdateUserDto})
  throw new BadRequestException("user exist")
}
  const updateUser=await user.save();
  const userProfileResponse:UserProfileResponse ={
    id:updateUser._id.toString(),
    fullname :updateUser.fullname,
    username:updateUser.username,
    referralCode:updateUser.referralCode,
    amount: updateUser.amount
    
 }
  
 return userProfileResponse;
}

async getUserprofile(id:string){
  const  user =await this.userModel .findById(id);
  if(!user){
    throw new BadRequestException("user does not exist")
  }
    const userProfile:UserProfileResponse ={
    id:user._id.toString(),
    fullname :user.fullname,
    username:user.username,
    referralCode:user.referralCode,
    referredBy:user.referredBy,
    amount:user.amount,
    totalEarned:user.totalEarned,
    totalReferred:user.totalEarned
}
return userProfile
}
async getAllUsers():Promise<UserProfileResponse[]>{
  const users =await this.userModel.find();
if(!users||users.length===0){
  return[];
}
  const usersResponse:UserProfileResponse[] = users.map(user=>({
    id:user._id.toString(),
    fullname :user.fullname,
    username:user.username,
    referralCode:user.referralCode,
    referredBy:user.referredBy,
    amount:user.amount, 
    totalEarned:user.totalEarned,
    totalReferred:user.totalEarned
  }))

return usersResponse


}

//2 AUTH SERVICE
   
   async userLogin (userLoginDto:UserLoginDto){
  const  user =await this.userModel .findOne({
    username:userLoginDto.username.toLowerCase(),
  });
  if(!user){
    throw new BadRequestException("Invalid user name");
  }
  const isPwdMatch=await bcrypt.compare(userLoginDto.password ,user.password);
  if(!isPwdMatch){
    throw new BadRequestException("incorrect password")
  }
const jwtData={
  id:user._id.toString(),
  fullname:user.fullname,
  usename:user.username
}
const generateToken=CommonUtils.generateJwtToken(jwtData)
console.log("GENERATED TOKEN,generatedToken")
return{
  accessToken:generateToken,
}
}
   async getMyreferralCode (currentUser){
  const  user =await this.userModel .findById(currentUser._id);
  if(!user){
    throw new BadRequestException("user does not exist");
  }
   const userResponse:UserProfileResponse={
    referralCode:user.referralCode,
   }

   return userResponse
   }
  }