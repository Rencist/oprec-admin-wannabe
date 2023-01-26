import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class PendaftarDto {
  @IsOptional()
  @ApiProperty()
  name: string;
  
  @ApiProperty({
    readOnly: true,
    type: String,
    description: 'Akan dibuat oleh server',
  })
  user_id: string;

  @Transform(({ value }) => parseInt(value))
  @ApiProperty()
  list_lab_id: number;

  @IsOptional()
  @ApiProperty()
  nrp: string;

  @IsOptional()
  @ApiProperty()
  no_telp: string;

  @IsOptional()
  @ApiProperty()
  alasan: string;

  @IsOptional()
  @ApiProperty()
  motivasi: string;

  @IsOptional()
  @ApiProperty()
  link_kreasi: string;
}
