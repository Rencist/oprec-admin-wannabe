import { Module } from '@nestjs/common';
import { ListLabService } from './list_lab.service';
import { ListLabController } from './list_lab.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '../../guards/jwt/jwt.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { NestjsFormDataModule } from 'nestjs-form-data/dist/nestjs-form-data.module';

@Module({
  controllers: [ListLabController],
  providers: [ListLabService],
  imports: [PrismaModule, JwtModule, PaginationModule, NestjsFormDataModule],
})
export class ListLabModule {}
