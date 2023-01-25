import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { FileField, File } from 'nestjs-file-upload';

export class uploadFiles {
  @ApiProperty()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  path: string;

  @ApiProperty()
  @IsNotEmpty()
  res: string;

  @ApiProperty()
  @Expose()
  @FileField({
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 5 * 1000 * 1000,
  })
  @IsNotEmpty()
  fileIs: File;
}
