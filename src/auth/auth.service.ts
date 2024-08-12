import {  Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserDto } from './dto/create-auth';
import { Request, Response } from 'express';
import { AuthServices } from 'src/auth-service/bcrypting';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwt: JwtService) { }

  async signUp(dto: UserDto, req: Request, res: Response) {
    const { name, email, address, phoneNumber, password } =
      dto
    const foundUser = await this.prisma.user.findUnique({ where: { email: email } })
    if (foundUser) {
      return res.status(409).json({
        message: 'User Already has account  please login',
        dto: null
      })
    }
    const hashPassword = await AuthServices.hashPassword(dto.password)
    dto.password = hashPassword
    const newUser = await this.prisma.user.create(dto)
    const userData = { password, ...newUser }
    const token = AuthServices.jwtSignUser(userData)
    res.status(200).json({
      message: "SignUp successful",
      data: token
    })
  }

  async signIn(dto: UserDto, req: Request, res: Response,) {
    try {
      const { email, password } = dto
      const foundAgent = await this.prisma.agent.findUnique({
        where: { email: email }
      })

      if (!foundAgent) {
        res.status(401).json({
          message: "Email or password doesnot exist please create account",
          data: null
        })
      }

      const isMatch = await AuthServices.matchPassword(password, foundAgent.password)

      if (!isMatch) {
        res.status(401).json({
          message: "Wrong Password",
          data: null
        })
      }

      const userData = { password, ...foundAgent }
      const token = AuthServices.jwtSignUser(userData)

      res.status(200).json({
        message: "Login Successful",
        data: token

      })

    } catch (error) {
      return res.status(error?.status || 500).json({
        message: error.message || "something went wrong",
        data: null
      })

    }
}

// async currentUser(req:Request, res:Response) {
//   const token = req.headers.authorization.split(" ").pop()
//   try {
//     const sessionUser = AuthServices.jwtVerifyUser(token || "")
//     if(!sessionUser || sessionUser.email) {
//       return res.status(401).json({
//         message:"No user Found",
//         data: null
//       })
//     }

//     const {password, ...presentUser} = await this.prisma.findUnique(sessionUser.email)
    
//   } catch (error) {
    
//   }
  
// }

}


