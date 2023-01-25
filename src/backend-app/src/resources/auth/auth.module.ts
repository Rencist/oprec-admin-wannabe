import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '../../guards/jwt/jwt.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { NestjsFormDataModule } from 'nestjs-form-data/dist/nestjs-form-data.module';

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [PrismaModule, JwtModule, PaginationModule, NestjsFormDataModule],
})
export class AuthModule {}
