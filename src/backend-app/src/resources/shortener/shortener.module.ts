import { Module } from '@nestjs/common';
import { ShortenerService } from './shortener.service';
import { ShortenerController } from './shortener.controller';
import { PrismaModule } from '../../prisma/prisma.module';
import { JwtModule } from '../../guards/jwt/jwt.module';
import { PaginationModule } from 'src/pagination/pagination.module';
import { PaginationService } from 'src/pagination/pagination.service';

@Module({
  controllers: [ShortenerController],
  providers: [ShortenerService, PaginationService],
  imports: [PrismaModule, JwtModule, PaginationModule],
})
export class ShortenerModule {}
