import { IsOptional, IsString, IsEmail, MinLength, IsNotEmpty } from "class-validator";
import { isObject } from "node:util";

export class RegisterUserDto {
    @IsString()
    fullname: string;
    
    @IsString()
    username: string;       
    
    @IsString()
    @MinLength(6)           
    password: string;
    
    @IsOptional()
    @IsString()
    referredBy?: string;  
}

export class UpdateUserDto {
    @IsString()
    fullname: string;
    @IsString()
    username: string;       
    @IsString()
    @MinLength(6)           
    password: string;
    @IsOptional()
    @IsString()
    refferedBy?: string;  
}
export class UserLoginDto {

    @IsString()
    @IsNotEmpty()
    username: string;       
    @IsString()
    @IsNotEmpty()         
    password: string;

}

         
       
   

      
