import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PaginationService } from 'src/pagination/pagination.service';

@Injectable()
export class ListLabService {
  constructor(
    private prisma: PrismaService, 
    private pagination: PaginationService
    ) {}

    async getAllLab() {
      const list_lab = await this.prisma.list_lab.findMany();
      if (!list_lab) throw new NotFoundException('Lab not found');
      return list_lab;
    }
}
