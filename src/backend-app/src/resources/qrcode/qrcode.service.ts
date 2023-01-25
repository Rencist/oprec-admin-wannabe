import { Injectable } from '@nestjs/common';
import * as QRCode from 'qrcode';
import { createqrcode } from 'src/dto/qrcode/qrCode.dto';

@Injectable()
export class QrcodeService {
  async generateQrCode(data: createqrcode) {
    const base64 = await QRCode.toDataURL(data.uid, { scale: 30 });
    return base64;
  }
}
