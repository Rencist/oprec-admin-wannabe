import { Module } from '@nestjs/common';
import { PendaftarService } from './pendaftar.service';
import { PendaftarController } from './pendaftar.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '../../guards/jwt/jwt.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { NestjsFormDataModule } from 'nestjs-form-data/dist/nestjs-form-data.module';

@Module({
  controllers: [PendaftarController],
  providers: [PendaftarService],
  imports: [PrismaModule, JwtModule, PaginationModule, NestjsFormDataModule],
})
export class PendaftarModule {}
