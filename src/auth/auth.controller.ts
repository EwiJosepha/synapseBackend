import { Controller, Get, Post, Body, Req, Res,Headers } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/create-auth';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto:UserDto, @Req() req, @Res() res) {
    return this.authService.signUp( dto,req,res)
  }

  @Post('signin')
  signin(@Body() dto: UserDto, @Req() req, @Res() res) {
    return this.authService.signIn(dto,req, res)
  }

  // @Get('signout')
  // signout(@Body()  @Req() req, @Res() res, ) {
  //   return this.authService.signOut(req, res)
  // }


  @Get('current-user')
  async currentAgent(@Res() res: Response, @Headers('authorization') authorization: string ) {
    console.log(authorization);

    const token = authorization.split(' ').pop();

    // if (!token) {
    //   return res.status(401).json({
    //     message: 'Invalid Token',
    //   });
    // }

    // const agentObj = await this.authService.currentAgent(token);

    // return res.status(200).json({
    //   agentObj
    // })
  }
}
