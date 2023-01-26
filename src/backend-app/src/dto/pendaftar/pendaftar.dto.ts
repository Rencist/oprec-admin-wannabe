import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PendaftarDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
  
  @ApiProperty({
    readOnly: true,
    type: String,
    description: 'Akan dibuat oleh server',
  })
  user_id: string;

  @Transform(({ value }) => parseInt(value))
  @IsNotEmpty()
  @ApiProperty()
  list_lab_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  nrp: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  no_telp: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  alasan: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  motivasi: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  link_kreasi: string;
}
