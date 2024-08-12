// import { Module } from '@nestjs/common';
// import { AuthService } from './auth.service';
// import { AuthController } from './auth.controller';
// import { PrismaService } from './prisma.service';
// import { JwtModule } from '@nestjs/jwt';
// import { jwtSecret } from 'src/utils/constants';

// @Module({
//   imports: [
//     JwtModule.register({
//       global: true,
//       secret: jwtSecret,
//       signOptions: {
//         expiresIn: '10 days',
//       }
//     })
//   ],
//   controllers: [AuthController],
//   providers: [AuthService, PrismaService],
// })
// export class AuthModule {}
