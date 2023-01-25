import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '../../guards/jwt/jwt.module';
import { PaginationModule } from 'src/pagination/pagination.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, JwtModule, PaginationModule],
})
export class AuthModule {}
