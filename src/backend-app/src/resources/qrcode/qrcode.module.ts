import { Module } from '@nestjs/common';
import { QrcodeService } from './qrcode.service';

@Module({
  controllers: [],
  providers: [QrcodeService],
})
export class QrcodeModule {}
