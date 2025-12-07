import { Controller, Post, Patch, Get, Body, HttpCode, HttpStatus, Request, Param } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { RegisterUserDto, UpdateUserDto } from '../dto/users.dto';
import { UserProfileResponse } from '../responses/users.response';

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
  
@Get('all')
async getAllUsers(){
  const result = await this.usersService.getAllUsers()
  return result
}



  
}

