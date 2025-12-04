import { IsOptional, IsString, IsEmail, MinLength } from "class-validator";

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
    refferedBy?: string;  
}
export class LoginUserDto {
    @IsString()
    username: string;        
    
    @IsString()
    password: string;        
}
export class UpdateUserDto {
    @IsOptional()
    @IsString()
    fullname?: string;      
    
 @IsOptional()
    @IsString()
    @MinLength(6)
    password?: string;         
       
   

      
}