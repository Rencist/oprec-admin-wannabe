import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './resources/auth/auth.module';
import { JwtModule } from './guards/jwt/jwt.module';
import { ShortenerModule } from './resources/shortener/shortener.module';
import { PaginationModule } from './pagination/pagination.module';
import { EmailModule } from './resources/email/email.module';
import { QrcodeModule } from './resources/qrcode/qrcode.module';
import { ServeStaticModule } from '@nestjs/serve-static/dist/serve-static.module';
import { resolve } from 'path';
import { PendaftarModule } from './resources/pendaftar/pendaftar.module';
import { ListLabModule } from './resources/list_lab/list_lab.module';

const ENV = process.env.ENV;

@Module({
  imports: [
    ServeStaticModule.forRoot(
      (() => {
        const publicDir = resolve('src/uploads');
        const servePath = '/files';

        return {
          rootPath: publicDir,

          serveRoot: servePath,
          exclude: ['/api*'],
        };
      })(),
    ),
    ConfigModule.forRoot({
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
    }),
    // OpenRecruitmentModule,
    PrismaModule,
    AuthModule,
    JwtModule,
    ShortenerModule,
    PaginationModule,
    EmailModule,
    QrcodeModule,
    PendaftarModule,
    ListLabModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
