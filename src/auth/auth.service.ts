import { Injectable } from '@nestjs/common';
import { UserDto } from './dto/create-auth';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthServices } from 'src/auth-service/bcrypting';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  
  async signUp(dto: UserDto, req: Request, res: Response) {
    const { email, password, name, phoneNumber } =
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
    const newUser = await this.prisma.user.create({ data: dto })
    const {password:_, ...userData} =  newUser
    console.log(userData);
    
    const token = AuthServices.jwtSignUser(userData)
    res.status(200).json({
      message: "SignUp successful",
      data: token
    })    
  }

  async signIn(dto: UserDto, req: Request, res: Response,) {
    try {
      const { email, password } = dto
      const foundUser = await this.prisma.user.findUnique({
        where: { email: email }
      })

      if (!foundUser) {
        res.status(401).json({
          message: "Email or password does not exist please create account",
          data: null
        })
      }

      const isMatch = await AuthServices.matchPassword(password, foundUser.password)

      if (!isMatch) {
        res.status(401).json({
          message: "Wrong Password",
          data: null
        })
      }
      const { password: _, ...userDataWithoutPassword } = foundUser
      
      const token = AuthServices.jwtSignUser(userDataWithoutPassword)
      console.log(userDataWithoutPassword);
      

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

  async currentUser(req:Request, res:Response) {
    const token = req.headers.authorization.split(" ").pop()
    if(!token) {
      return res.status(401).json({message:"No Token Found", data:null})
    }
    
    try {
      const sessionUser = AuthServices.jwtVerifyUser(token || "")
      console.log(sessionUser, "session");
      
      // if(!sessionUser || !sessionUser.email) {
      //   return res.status(401).json({
      //     message:"No user Found",
      //     data: null
      //   })
      // }

      // const {password, ...presentUser} = await this.prisma.user.findUnique(sessionUser.email)
      // return res.status(200).json({message: "User Found", data:presentUser})

    } catch (error) {
      console.error('Error in currentUser:', error);
      return res.status(500).json({
        message: "Internal server error",
        data: null
      });
    }

  }

}


