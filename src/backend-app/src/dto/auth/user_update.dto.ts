import { IsOptional } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { FileField, File } from 'nestjs-file-upload';
import { Expose } from 'class-transformer';

export class UserUpdateDto {
  @IsOptional()
  @ApiProperty()
  fullname: string;

  @IsOptional()
  @ApiProperty()
  no_telp: string;

  @IsOptional()
  @ApiProperty()
  alamat: string;

  @IsOptional()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @Expose()
  @FileField({
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 5 * 1000 * 1000,
  })
  @IsOptional()
  foto: File;

  @IsOptional()
  role: Role;
  
}
