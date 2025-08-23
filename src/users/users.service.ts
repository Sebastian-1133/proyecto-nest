// src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.usuario.findMany({
      select: { id: true, email: true, role: true, createdAt: true },
    });
  }

  async findOne(id: number) {
    return this.prisma.usuario.findUnique({
      where: { id },
      select: { id: true, email: true, role: true, createdAt: true },
    });
  }

  async findByEmail(email: string) {
    return this.prisma.usuario.findUnique({ where: { email } });
  }

  async create(data: { email: string; password: string; role?: string }) {
    return this.prisma.usuario.create({
      data: { email: data.email, password: data.password, role: data.role },
      select: { id: true, email: true, role: true, createdAt: true },
    });
  }
}
