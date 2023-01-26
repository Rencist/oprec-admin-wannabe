import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  InternalServerErrorException,
  HttpException,
  Param,
  Query,
} from '@nestjs/common';
import { ApiConsumes, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { FileInjector } from 'nestjs-file-upload';
import { JwtGuard } from '../../guards/jwt/jwt.guard';
import { JwtService } from '../../guards/jwt/jwt.service';
import { LoginDto } from '../../dto/auth/auth.dto';
import { Token } from '../../decorators/token.decorator';
import { UserDto } from 'src/dto/auth/user.dto';
import { UserBody } from 'src/decorators/auth/user.decorator';
import { UserUpdateDto } from 'src/dto/auth/user_update.dto';
import { PaginationDto } from 'src/dto/pagination/pagination.dto';
import { FileSystemStoredFile, FormDataRequest } from 'nestjs-form-data';

@ApiTags('authentication')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly jwtService: JwtService,
  ) {}
    
  @Post('register') 
  @FileInjector(UserDto)
  @UserBody()
  @ApiConsumes('multipart/form-data')
  @FormDataRequest({storage: FileSystemStoredFile})
  async register(@Body() user: UserDto) {
    try {
      const res = await this.authService.register(user);
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

  @Post('login')
  @FileInjector(UserDto)
  @UserBody()
  @ApiConsumes('multipart/form-data')
  @FormDataRequest({storage: FileSystemStoredFile})
  async login(@Body() LoginDto: LoginDto) {
    try {
      const user = await this.authService.login(LoginDto);
      const token = await this.jwtService.create({ uid: user.id });
      return {
        status: true,
        message: 'Berhasil Login',
        data: {token},
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }

  @Post('update/:user_id')
  @FileInjector(UserUpdateDto)
  @UseGuards(JwtGuard)
  @UserBody()
  @ApiConsumes('multipart/form-data')
  @FormDataRequest({storage: FileSystemStoredFile})
  async updateOrder(
    @Param('user_id') user_id: string,
    @Body() data: UserDto,
  ) {
    try {
      const res = await this.authService.updateUser(user_id, data);
      return {
        status: true,
        message: 'Berhasil Mengubah Data User',
        data: res,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }

  @UseGuards(JwtGuard)
  @Get('me')
  async getMe(@Token('uid') uid: string) {
    try {
      const user = await this.authService.getUser(uid);
      return {
        status: true,
        message: 'Berhasil Mendapatkan Detail Akun',
        data: {...user, type: user.role.toLocaleLowerCase()},
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }
  
  @UseGuards(JwtGuard)
  @Get(':User_id')
  async getUser(@Param('user_id') user_id: string) {
    try {
      const user = await this.authService.getUser(user_id);
      return {
        status: true,
        message: 'Berhasil Mendapatkan Data User',
        data: user,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }
  
  @UseGuards(JwtGuard)
  @Get('')
  async getAllUser(@Query() paginationQuery: PaginationDto,) {
    try {
      const user = await this.authService.getAllUser(paginationQuery);
      return {
        status: true,
        message: 'Berhasil Mengambil Data Semua User',
        data: user,
      };
    } catch (err) {
      if (err.status) throw new HttpException(err, err.status);
      else throw new InternalServerErrorException(err);
    }
  }

}
