import { BadRequestException, Injectable, UseFilters } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { ShortenerDto } from '../../dto/shortener/shortener.dto';
import { ExceptionHandler } from 'src/filters/http-exception.filter';
import { ForbiddenException } from 'src/exceptions/exception';
import { PaginationService } from 'src/pagination/pagination.service';
import { PaginationDto } from 'src/dto/pagination/pagination.dto';

@Injectable()
@UseFilters(new ExceptionHandler())
export class ShortenerService {
  constructor(
    private prisma: PrismaService,
    private pagination: PaginationService,
  ) {}

  async shorten(shorten: ShortenerDto) {
    if (!shorten.alias)
      while (!shorten.alias || shorten.alias == '') {
        const generate = this.generate(7);
        const exist = await this.prisma.shorten.findUnique({
          where: {
            alias: generate,
          },
        });

        if (!exist) shorten.alias = generate;
      }

    if (!shorten.expiration) {
      shorten.expiration = null;
    }

    const exist = await this.prisma.shorten.findUnique({
      where: {
        alias: shorten.alias,
      },
    });

    if (!exist) {
      const data = await this.prisma.shorten.create({
        data: shorten,
      });
      delete data.userId;
      delete data.id;
      return data;
    } else throw new BadRequestException('Alias already exist');
  }

  generate(length: number): string {
    let result = '';
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }

  async getUrl(alias: string) {
    const url = await this.prisma.shorten.findUnique({
      where: {
        alias: alias,
      },
      include: {
        createdBy: true,
      },
    });

    if (url) {
      delete url.createdBy.password;
      delete url.createdBy.id;
      delete url.userId;
    }

    return url;
  }

  async getAllurl(paginationQuery: PaginationDto) {
    const data = await this.prisma.shorten.findMany({
      include: {
        createdBy: true,
      },
    });
    const url = await this.pagination.paginationFilter(
      paginationQuery,
      'shorten',
      data,
    );

    if (url.data)
      url.data.forEach((url) => {
        delete url.createdBy.password;
        delete url.createdBy.id;
        delete url.userId;
      });

    return url;
  }

  async getByUid(uid: string, paginationQuery: PaginationDto) {
    const data = await this.prisma.shorten.findMany({
      where: {
        userId: uid,
      },
      include: {
        createdBy: true,
      },
    });

    const url = await this.pagination.paginationFilter(
      paginationQuery,
      'shorten',
      data,
    );

    if (url.data)
      url.data.forEach((url) => {
        delete url.createdBy.password;
        delete url.createdBy.id;
        delete url.userId;
      });

    return url;
  }

  async update(shorten: ShortenerDto, id: number) {
    const url = await this.prisma.shorten.findUnique({
      where: {
        id,
      },
      include: {
        createdBy: true,
      },
    });
    if (!url) {
      throw new BadRequestException('Url tidak ditemukan');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        id: shorten.userId,
      },
    });

    if (
      url.createdBy.id == shorten.userId ||
      user.email == 'admin@inilho.its.ac.id'
    ) {
      if (!shorten.alias)
        while (!shorten.alias || shorten.alias == '') {
          const generate = this.generate(7);
          const exist = await this.prisma.shorten.findUnique({
            where: {
              alias: generate,
            },
          });
          if (!exist) shorten.alias = generate;
        }

      if (!shorten.expiration) shorten.expiration = null;

      const updatedUrl = await this.prisma.shorten.update({
        where: {
          id,
        },
        data: {
          ...shorten,
        },
      });
      delete updatedUrl.userId;
      return updatedUrl;
    } else {
      throw new ForbiddenException();
    }
  }

  async delete(uid: string, id: number) {
    const url = await this.prisma.shorten.findUnique({
      where: {
        id,
      },
      include: {
        createdBy: true,
      },
    });

    const user = await this.prisma.user.findFirst({
      where: {
        id: uid,
      },
    });

    if (!url) {
      throw new BadRequestException('Url tidak ditemukan');
    }

    if (url.userId == uid || user.email == 'admin@inilho.its.ac.id') {
      const deletedUrl = await this.prisma.shorten.delete({
        where: {
          id,
        },
      });

      delete deletedUrl.userId;
      return deletedUrl;
    } else {
      throw new ForbiddenException();
    }
  }
}
