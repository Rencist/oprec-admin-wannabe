import { IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { FileField, File } from 'nestjs-file-upload';
import { Expose } from 'class-transformer';

export class UserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  fullname: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  no_telp: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alamat: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  password: string;

  @ApiProperty()
  @Expose()
  @FileField({
    allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp'],
    maxSize: 5 * 1000 * 1000,
  })
  @IsNotEmpty()
  foto: File;

  @IsOptional()
  @IsString()
  role: Role;
  
}
