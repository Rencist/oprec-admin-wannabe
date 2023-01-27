import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { PaginationService } from 'src/pagination/pagination.service';
import { PendaftarDto } from 'src/dto/pendaftar/pendaftar.dto';

@Injectable()
export class PendaftarService {
  constructor(
    private prisma: PrismaService, 
    private pagination: PaginationService
    ) {}

  async create(data: PendaftarDto, uid: string) {
    const checkPendaftar = await this.prisma.pendaftar_lab.findUnique({
      where: {
        nrp: data.nrp,
      },
    });

    if (checkPendaftar) {
      throw new BadRequestException('NRP sudah terdaftar');
    }

    const checkUser = await this.prisma.pendaftar_lab.findFirst({
      where: {
        user_id: uid,
      },
    });

    if (checkUser) {
      throw new BadRequestException('User sudah terdaftar');
    }
    
    const newdata: Prisma.pendaftar_labUncheckedCreateInput = {
      name: data.name,
      list_lab_id: data.list_lab_id,
      user_id: uid,
      nrp: data.nrp,
      no_telp: data.no_telp,
      alasan: data.alasan,
      motivasi: data.motivasi,
      link_kreasi: data.link_kreasi,
    };
    const success = new Promise((resolve, reject) => {
      const pendaftar = this.prisma.pendaftar_lab.create({
        data: newdata,
      });
      if (!pendaftar) reject();
      resolve(pendaftar);
    });
    return success;
  }

  async getPendaftar(id: string) {
    const pendaftar = await this.prisma.pendaftar_lab.findFirst({
      where: { user_id: id },
    });
    if (!pendaftar) throw new NotFoundException('Pendaftar not found');
    const labPendaftar = await this.prisma.list_lab.findUnique({
      where: {
        id: pendaftar.list_lab_id
      }
    });
    const labPendaftar2 = labPendaftar.name;
    return {...pendaftar, labPendaftar: labPendaftar2};
  }
}
