import {
  BadRequestException,
  Body,
  Controller,
  HttpException,
  Post,
  Request,
} from '@nestjs/common';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';
import { AuthService } from './auth.service';

interface LoginDto {
  email: string;
  password: string;
}

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginUserDto: LoginDto) {
    return this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );
  }

  @Post('register')
  async register(@Body() registerUserDto: LoginDto) {
    return this.authService.register(
      registerUserDto.email,
      registerUserDto.password,
    );
  }
}
