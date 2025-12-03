import { Injectable, BadRequestException, NotFoundException, NotAcceptableException } from '@nestjs/common';
import { RegisterUserDto, LoginUserDto, UpdateUserDto } from '../dto/users.dto';
import { UserProfileResponse } from '../responses/users.response';
import { User } from '../schemas/users.schema';

@Injectable()
export class UsersService {
  async registerUser(registerDto: RegisterUserDto) {
   
    const newUser = {} as User; 

    return {
      message: 'User registered successfully',
      user: {
        username: newUser.username,
        },
    };
  }

  async loginUser(loginDto: LoginUserDto) {
    const user = {} as User; 


    const isPasswordValid = true;

    if (!isPasswordValid) {
      throw new NotAcceptableException('Invalid username or password');
    }

    return {
      message: 'Login successfully',
      token: 'jwt-token', 
      user: {
        
        username: user.username,
        fullname: user.fullname,
      },
    };
  }

  async updateProfile(userId: string, updateDto: UpdateUserDto) {
    const user = {} as User; 

   if (updateDto.fullname) {
   
    }

    if (updateDto.password) {
      
    }
    return {
      message: 'Profile updated successfully',
      user: {
        
        username: user.username,
        fullname: user.fullname,
      },
    };
  }

  async getMyReferral(userId: string) {
    const user = {} as User; 

  const referrals: User[] = []; 


  }
}