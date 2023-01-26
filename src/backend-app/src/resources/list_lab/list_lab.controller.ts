import {
  Controller,
  InternalServerErrorException,
  HttpException,
  UseGuards,
  Get,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { JwtGuard } from 'src/guards/jwt/jwt.guard';
import { ListLabService } from './list_lab.service';
import { RolesGuard } from 'src/guards/roles/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from '@prisma/client';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('list_lab')
@Controller('list_lab')
export class ListLabController {
  constructor(
    private readonly listLabService: ListLabService,
  ) {}
    
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('')
  async getAllLab() {
    try {
      const lab = await this.listLabService.getAllLab();
      return {
        status: true,
        message: 'Berhasil Mengambil Data Semua Lab',
        data: lab,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }
    
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Get('admin/:lab_id')
  async getListAdminLab(@Param('lab_id', new ParseIntPipe()) lab_id: number) {
    try {
      const lab = await this.listLabService.getListAdminLab(lab_id);
      return {
        status: true,
        message: 'Berhasil Mengambil Data List Admin Lab',
        data: lab,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }
    
  @UseGuards(JwtGuard, RolesGuard)
  @Roles(Role.USER)
  @Get(':lab_id')
  async getDetailLab(@Param('lab_id', new ParseIntPipe()) lab_id: number) {
    try {
      const lab = await this.listLabService.getDetailLab(lab_id);
      return {
        status: true,
        message: 'Berhasil Mengambil Data Detail Lab',
        data: lab,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }
}
