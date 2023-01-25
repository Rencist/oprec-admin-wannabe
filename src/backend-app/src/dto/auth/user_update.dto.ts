import { IsEmail, IsOptional } from 'class-validator';
import { Role } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UserUpdateDto {
  @IsOptional()
  @ApiProperty()
  fullname: string;

  @IsOptional()
  @ApiProperty()
  @IsEmail()
  email: string;

  @IsOptional()
  @ApiProperty()
  password: string;

  @IsOptional()
  role: Role;
}
