import { IsNotEmpty, IsString } from 'class-validator';

export class createqrcode {
  @IsString()
  @IsNotEmpty()
  uid: string;
}
