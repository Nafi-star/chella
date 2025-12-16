import { Controller, Post, Patch, Get, Body, Param, Req } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { RegisterUserDto, UpdateUserDto, UserLoginDto } from '../dto/users.dto';
import { JwtAuthGuard } from '../commons/guards/jwt.auth.guard';
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterUserDto) {
    return await this.usersService.registerUser(registerDto);
  }

 @Patch('/update-user/:id')
 async updateProfile(
  @Param('id')id:string,
  @Body()updateUserDto:UpdateUserDto,
 ){
  const result =await this.usersService.updateUser(id,updateUserDto)
  return result;
 }
@Get('get-profile/:id')
async getUserProfile(
  @Param('id')id:string
){
  const result =await this.usersService.getUserprofile(id)
  return result
}

@JwtAuthGuard()
@Get('get-all')
async getAllUsers(@Req() req: any) {
  const result = await this.usersService.getAllUsers();
  return result;
}

@Post('login')
async userLogin(@Body()userLoginDto:UserLoginDto){
  const result=await this.usersService.userLogin(userLoginDto);
  return result;
}
@Get('myRefferal-code')
@JwtAuthGuard()
async getMyreferralCode(@Req() req:any){
  const currentUser=req.user;
  const result= await this.usersService.getMyreferralCode(currentUser)
  return result;
}

  
}

