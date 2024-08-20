import { Controller, Get, Post, Body, Req, Res, Headers, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create-auth';


@Controller('auth')
export class AuthController {
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
  getAllUsers () {
    return this.authService.getUsers()
  }

  @Get(':id')
  getOneUser(@Param('id') id: string) { 
    return this.authService.getAUser(id)
  }

  // @Get('signout')
  // signout(@Body()  @Req() req, @Res() res, ) {
  //   return this.authService.signOut(req, res)
  // }


  @Get('currentuser')
  async currentUser(@Headers('authorization') authorization: string,@Req() req, @Res() res) {
    if(authorization){
      const token = authorization.split(' ').pop();
      const returnUser = this.authService.currentUser(token, req, res)
      console.log("current user",returnUser)
      return returnUser;
    }



  }
}
