import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  ParseIntPipe,
  Delete,
  UseInterceptors,
  HttpException,
  NotFoundException,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ShortenerDto } from '../../dto/shortener/shortener.dto';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { ShortenerService } from './shortener.service';
import { Token } from '../../decorators/token.decorator';
import { TransformInterceptor } from 'src/interceptors/response.interceptor';
import { PaginationDto } from 'src/dto/pagination/pagination.dto';

@ApiTags('shortener')
@Controller('shortener')
@UseInterceptors(new TransformInterceptor())
export class ShortenerController {
  constructor(private readonly shortenerService: ShortenerService) {}

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Post('')
  async shorten(@Body() shorten: ShortenerDto, @Token('uid') uid: string) {
    try {
      shorten.userId = uid;
      const shortener = await this.shortenerService.shorten(shorten);
      if (shortener)
        return {
          status: true,
          message: 'Berhasil memendekkan url',
          data: shortener,
        };
      else
        return {
          status: false,
          message: 'Gagal memendekkan url',
        };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }

  @Get('/getUrl/:alias')
  async getUrl(@Param('alias') alias: string) {
    try {
      const shortener = await this.shortenerService.getUrl(alias);
      if (shortener)
        return {
          status: true,
          message: 'Berhasil mendapatkan url',
          data: shortener,
        };
      else
        throw new NotFoundException(
          'Gagal mendapatkan url / Url tidak dapat ditemukan',
        );
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get()
  async getAllUrl(@Query() paginationQuery: PaginationDto) {
    try {
      const allUrl = await this.shortenerService.getAllurl(paginationQuery);
      return {
        status: true,
        message: 'Berhasil mendapatkan semua url',
        ...allUrl,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Get('/:uid')
  async getByUid(
    @Param('uid') uid: string,
    @Query() paginationQuery: PaginationDto,
  ) {
    try {
      const url = await this.shortenerService.getByUid(uid, paginationQuery);
      return {
        status: true,
        message: 'Berhasil mendapatkan url',
        ...url,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Put(':id')
  async updateUrl(
    @Param('id', ParseIntPipe) id: number,
    @Body() shorten: ShortenerDto,
    @Token('uid') uid: string,
  ) {
    try {
      shorten.userId = uid;
      const url = await this.shortenerService.update(shorten, id);
      if (url)
        return {
          status: true,
          message: 'Berhasil merubah url',
          data: url,
        };
      else
        return {
          status: false,
          message: 'gagal merubah url',
        };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }

  @UseGuards(JwtGuard)
  @ApiBearerAuth()
  @Delete(':id')
  async deleteUrl(
    @Param('id', ParseIntPipe) id: number,
    @Token('uid') uid: string,
  ) {
    try {
      const result = await this.shortenerService.delete(uid, id);
      return {
        status: true,
        message: 'Berhasil menghapus url',
        data: result,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }
}
