import { Controller, Post, Patch, Get, Body, HttpCode, HttpStatus, Request } from '@nestjs/common';
import { UsersService } from '../services/users.service';
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from '../dto/users.dto';
import { UserProfileResponse } from '../responses/users.response';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('/register')
  async register(@Body() registerDto: RegisterUserDto) {
    return await this.usersService.registerUser(registerDto);
  }

  @Post('/login')
  async login(@Body() loginDto: LoginUserDto) {
    return await this.usersService.loginUser(loginDto);
  }

  @Patch('/update-profile')
  async updateProfile(@Request() req: any, @Body() updateDto: UpdateUserDto) {
    const userId = 'user-id-from-token'; 
    return await this.usersService.updateProfile(userId, updateDto);
  }



  @Get('/myreferral')
  @HttpCode(HttpStatus.OK)
  async getMyReferral(@Request() req: any) {
    const userId = 'user-id-from-token';
    return await this.usersService.getMyReferral(userId);
  }
}