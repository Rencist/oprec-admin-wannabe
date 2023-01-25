import { IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class PendaftarDto {
  @IsOptional()
  @ApiProperty()
  name: string;

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
