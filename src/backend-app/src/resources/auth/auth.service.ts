import {
  BadRequestException,
  HttpException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from '../../dto/auth/auth.dto';
import { PrismaService } from '../../prisma/prisma.service';
import { compare, hash } from 'bcrypt';
import { Login_Attempt, Prisma, User } from '@prisma/client';
import { uploadFiles } from 'src/dto/auth/uploadFiles.dto';
import * as fs from 'fs';
import * as sharp from 'sharp';
import * as path from 'path';
import { UserDto } from 'src/dto/auth/user.dto';
import { UserUpdateDto } from 'src/dto/auth/user_update.dto';
import { PaginationDto } from 'src/dto/pagination/pagination.dto';
import { PaginationService } from 'src/pagination/pagination.service';

const SALT_PASSWORD = 13;

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService, 
    private pagination: PaginationService
    ) {}

  async login(LoginDto: LoginDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: LoginDto.email,
      },
      include: {
        loginAttempt: true,
      },
    });

    if (!user)
      throw new UnauthorizedException('No Telp / Password not valid');

    //cek login attempt
    const _cekAttempt = await this.cekAttempt(user);
    if (!_cekAttempt.status)
      throw new HttpException(
        `Terlalu banyak mencoba. Tunggu ${_cekAttempt.second} detik untuk mencoba kembali.`,
        429,
      );

    // compare passwords
    const areEqual = await compare(LoginDto.password, user.password);
    if (!areEqual)
      throw new UnauthorizedException('No Telp / Passoword not valid');

    // reset login attempt
    await this.prisma.login_Attempt.update({
      where: {
        userId: user.id,
      },
      data: {
        countAttempt: 0,
        limitTime: null,
      },
    });

    delete user.password;
    return user;
  }

  async register(user: UserDto) {
    const checkUser = await this.prisma.user.findUnique({
      where: {
        email: user.email,
      },
    });

    if (checkUser) {
      throw new BadRequestException('No Telp sudah terdaftar');
    }

    const newdata: Prisma.UserUncheckedCreateInput = {
      fullname: user.fullname,
      email: user.email,
      password: user.password
    };
    const success = new Promise((resolve, reject) => {
      hash(user.password, SALT_PASSWORD, async (err, hash) => {
        newdata.password = hash;

        const user = await this.prisma.user.create({
          data: newdata,
        });
        if (!user) reject();
        resolve(user);
      });
    });
    return success;
  }

  async updateUser(user_id: string, data: UserUpdateDto) {
    const cekUser = await this.prisma.user.findFirst({
      where: {
        id: user_id,
      },
    });
    if (!cekUser) {
      throw new BadRequestException('User tidak ditemukan');
    }

    const newdata: Prisma.UserUncheckedUpdateInput = {
      fullname: data.fullname,
      email: data.email,
      password: data.password
    };

    const result = await this.prisma.user.update({
      where: {
        id: user_id,
      },
      data: newdata,
    });
    return result;
  }

  async getUser(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) throw new NotFoundException('User not found');
    const id_pendaftar = await this.prisma.pendaftar_lab.findFirst({
      where: {
        user_id: id
      },
    })
    if(id_pendaftar) return {...user, is_pendaftar: true};
    else return {...user, is_pendaftar: false};
  }

  async getAllUser(paginationQuery: PaginationDto) {
    const user = await this.prisma.user.findMany();
    if (!user) throw new NotFoundException('User not found');

    const paginationRes = await this.pagination.paginationFilter(
      paginationQuery,
      'user',
      user,
    );
    return paginationRes;
  }

  async cekAttempt(
    user: User & { loginAttempt: Login_Attempt },
  ): Promise<{ status: boolean; second?: number }> {
    let res = true;
    let second = 0;
    if (user.loginAttempt) {
      if (user.loginAttempt.limitTime) {
        const nowDateTime: number = new Date().getTime() / 1000;
        let sub = nowDateTime - user.loginAttempt.limitTime.getTime() / 1000;
        sub = Math.round(sub);
        if (sub < 0) {
          res = false;
          return {
            status: res,
            second: Math.abs(sub),
          };
        }
      }
      if (user.loginAttempt.countAttempt >= 3) {
        const date = new Date();
        date.setMinutes(date.getMinutes() + 3);
        await this.prisma.login_Attempt
          .update({
            where: {
              userId: user.id,
            },
            data: {
              countAttempt: 0,
              limitTime: date,
            },
          })
          .then(() => {
            res = false;
            second = 180;
          });
      } else {
        await this.prisma.login_Attempt.update({
          where: {
            userId: user.id,
          },
          data: {
            countAttempt: ++user.loginAttempt.countAttempt,
          },
        });
      }
    } else {
      await this.prisma.login_Attempt.create({
        data: {
          userId: user.id,
          countAttempt: 1,
        },
      });
    }

    return {
      status: res,
      second,
    };
  }

  async uploadFile(data: uploadFiles) {
    const getBuffer = data.fileIs.buffer;

    const newfilename =
      data.email + '-' + data.res + '.jpeg';
    const checkDir = fs.existsSync(data.path + '/' + data.res);
    if (!checkDir) {
      fs.mkdirSync(data.path + '/' + data.res, { recursive: true });
    }

    await sharp(getBuffer)
      .jpeg({ quality: 80 })
      .toFile(path.join(data.path + '/' + data.res, newfilename));

    return newfilename;
  }
}
