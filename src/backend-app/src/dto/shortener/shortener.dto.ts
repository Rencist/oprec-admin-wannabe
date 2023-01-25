import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsUrl } from 'class-validator';
export class ShortenerDto {
  @ApiProperty({
    readOnly: true,
    type: Number,
    description: 'Akan dibuat oleh server',
  })
  id: number;

  @ApiProperty({
    type: String,
    description: 'Merupakan url yang akan dipendekkan',
  })
  @IsUrl({}, { message: 'Harus berupa URL' })
  @IsNotEmpty({ message: 'Masukkan wajib diisi' })
  url: string;

  @ApiPropertyOptional({
    type: String,
    description:
      'Merupakan alias untuk url yang dipendekkan, bila kosong akan dibuat oleh server',
    default: '',
  })
  alias: string;

  @ApiProperty({
    readOnly: true,
    type: String,
    description: 'Merupakan UID User pembuat shortener',
  })
  userId: string;

  @ApiPropertyOptional({
    type: Number,
    description:
      'Merupakan waktu expire url yang dipendekkan, dapat dikosongkan bila tidak ingin ada expire',
    default: '',
  })
  expiration: Date;

  @ApiProperty({
    readOnly: true,
    type: Number,
    description:
      'Akan dibuat oleh server, dan zona waktu akan mengikuti zona waktu server',
  })
  createdAt: Date;
}
