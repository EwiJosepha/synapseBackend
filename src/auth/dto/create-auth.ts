// user.dto.ts
import { IsEmail, IsNotEmpty, IsString, Length, IsOptional } from 'class-validator';

export class UserDto {
    @IsNotEmpty({ message: 'Name is required.' })
    @IsString({ message: 'Name must be a string.' })
    @Length(1, 50, { message: 'Name must be between 3 and 50 characters.' })
    name: string;

    @IsNotEmpty({ message: 'Email is required.' })
    @IsString({ message: 'Password must be string' })
    email: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @IsEmail({}, { message: 'Email must be a valid email address.' })
    password: string;

    @IsString({ message: 'Phone number must be a string.' })
    @Length(10, 15, { message: 'Phone number must be between 10 and 15 characters.' })
    phoneNumber: string;
    
}

