import { Controller, Get, Post, Body, Req, Res, Headers, Param, UnauthorizedException, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create-auth';


@Controller('auth')
export class AuthController {
  userService: any;
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() dto: UserDto, @Req() req, @Res() res) {
    return this.authService.signUp(dto, req, res)
  }

  @Post('signin')
  signin(@Body() dto: UserDto, @Req() req, @Res() res) {
    return this.authService.signIn(dto, req, res)
  }

  @Get("users")
  getAllUsers() {
    return this.authService.getUsers()
  }

  // @Delete(':id')
  // async deleteUser(@Param('id') id: string) {
  //   await this.userService.deleteUser(id);
  //   return { message: 'User deleted' };
  // }

  
  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    return this.authService.deleteUser(userId); // Ensure authService is defined
  }

  // @Get(':id')
  // getOneUser(@Param('id') id: string) {
  //   return this.authService.getAUser(id)
  // }

  // @Get('signout')
  // signout(@Body()  @Req() req, @Res() res, ) {
  //   return this.authService.signOut(req, res)
  // }



  @Get('currentuser')
  async currentUser(@Headers('authorization') authorization: string, @Req() req, @Res() res) {
    if (authorization) {
      const token = authorization.split(' ').pop();
      if (!token) {
        throw new UnauthorizedException('Token not provided');
      }

      const returnUser = await this.authService.currentUser(token, req, res);
      console.log("Current user:", returnUser);
      return returnUser;
    } else {
      throw new UnauthorizedException('Authorization header not found');
    }
  }
}
