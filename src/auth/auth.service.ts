import { Delete, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserDto } from './dto/create-auth';
import { Request, Response } from 'express';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthServices } from 'src/auth-service/bcrypting';
import { JwtPayload } from 'jsonwebtoken';
interface JwtUserPayload extends JwtPayload {
  id: string;
  email: string;
  phoneNumber: string,
  name: string
}

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}
  
  async signUp(dto: UserDto, req: Request, res: Response) {
    const { email, password, name, phoneNumber } =
      dto
    const foundUser = await this.prisma.user.findUnique({ where: { email: email, password:password } })
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

     if(!token) {
      res.status(401).json("wrong sign up headers already exist")
    }

    console.log({token});
    
    
    return res.status(200).json({ 
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
        res.status(400).json({
          message: "Wrong Password",
          data: null
        })
      }
      const { password: _, ...userDataWithoutPassword } = foundUser
      
      const token = AuthServices.jwtSignUser(userDataWithoutPassword) 
      console.log(token);
           

     return  res.status(200).json({
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


  async currentUser(token: string, req: Request, res: Response) {
    try {
        const payload = AuthServices.jwtVerifyUser(token) as JwtUserPayload;
        console.log("Decoded payload:", payload);

        if (!payload || !payload.email) {
            throw new UnauthorizedException('Invalid token payload');
        }

        const user = await this.prisma.user.findUnique({
            where: { email: payload.email },
            select: { id: true, email: true, name: true }
        });

        if (!user) {
            throw new UnauthorizedException('User not found');
        }

        return res.status(200).json({ message: "Current User", data: user });
    } catch (error) {
        console.error('Error verifying token:', error);
        throw new UnauthorizedException('Invalid token');
    }
}

// async deleteUser(userId: string, token: string): Promise<void> {
//   try {
//     const payload = AuthServices.jwtVerifyUser(token) as JwtUserPayload;

//     if (!payload || payload.userId !== userId) {
//       throw new UnauthorizedException('Invalid token or user ID');
//     }

//     await this.prisma.user.delete({
//       where: {
//         id: userId
//       }
//     });
//   } catch (error) {
//     console.error('Error deleting user:', error);
//     throw new UnauthorizedException('Unable to delete user');
//   }
// }

async deleteUser(userId: string): Promise<void> {
  try {
    if (!userId) {
      throw new Error('User ID is required');
    }

    const deleted = await this.prisma.user.delete({
      where: {
        id: userId,
      },
    });
    return;
  } catch (error) {
    console.error('Error deleting user:', error);
    throw new NotFoundException('User not found or unable to delete user');
  }
}

  async getUsers () {
    const users = this.prisma.user.findMany({
      include: {
        sendMessages: true,
        conversationAsUser1: true,
        conveersationAsUser2: true
      }
    })    
    return users
  }

  // async getAUser (id: string) {
  //   const user =this.prisma.user.findUnique({where:{id:id}})
  //   console.log({user});
    
  //   return user
  // }

}


