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
  



  
}
