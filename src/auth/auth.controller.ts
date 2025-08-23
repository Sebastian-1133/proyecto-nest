// src/auth/auth.controller.ts
import { Body, Controller, Post, HttpCode, Header } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(@Body() dto: CreateUserDto) {
    return this.authService.register(dto);
  }

  @Post('login')
  @HttpCode(200)
  @Header('Content-Type', 'application/json; charset=utf-8')
  login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data);
  }
}
