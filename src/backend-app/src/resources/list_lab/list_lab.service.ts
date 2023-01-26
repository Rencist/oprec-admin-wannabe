import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ListLabService {
  constructor(
    private prisma: PrismaService,
    ) {}

    async getAllLab() {
      const list_lab = await this.prisma.list_lab.findMany();
      if (!list_lab.length) throw new NotFoundException('Lab not found');
      return list_lab;
    }

    async getListAdminLab(lab_id: number) {
      const list_lab = await this.prisma.list_admin.findMany({
        where: {
          list_lab_id: lab_id
        }
      });
      if (!list_lab.length) throw new NotFoundException('List lab not found');
      return list_lab;
    }

    async getDetailLab(lab_id: number) {
      const list_lab = await this.prisma.list_lab.findUnique({
        where: {
          id: lab_id
        }
      });
      if (!list_lab) throw new NotFoundException('List lab not found');
      return list_lab;
    }
}
