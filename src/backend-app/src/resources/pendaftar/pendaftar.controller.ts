import {
  Controller,
  Post,
  Body,
  InternalServerErrorException,
  HttpException,
  UseGuards,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PendaftarService } from './pendaftar.service';
import { FileInjector } from 'nestjs-file-upload';
import { PendaftarDto } from 'src/dto/pendaftar/pendaftar.dto';
import { PendaftarBody } from 'src/decorators/pendaftar/pendaftar.decorator';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';
import { Token } from 'src/decorators/token.decorator';

@ApiTags('pendaftar_lab')
@Controller('pendaftar_lab')
export class PendaftarController {
  constructor(
    private readonly pendaftarService: PendaftarService,
  ) {}
    
  @Post('create')
  @UseGuards(JwtGuard)
  @FileInjector(PendaftarDto)
  @PendaftarBody()
  @ApiConsumes('multipart/form-data')
  @FormDataRequest({storage: FileSystemStoredFile})
  async create(@Token('uid') uid: string, @Body() data: PendaftarDto) {
    try {
      const res = await this.pendaftarService.create(data, uid);
      return {
        status: true,
        message: 'Berhasil Register',
        data: res,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }
}
