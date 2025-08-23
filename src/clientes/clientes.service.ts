// src/clientes/clientes.service.ts
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClienteDto } from 'src/users/dto/create-cliente.dto';
import { UpdateClienteDto } from 'src/users/dto/update-cliente.dto';

@Injectable()
export class ClientesService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateClienteDto) {
    const user = await this.prisma.usuario.findUnique({
      where: { id: dto.usuarioId },
      include: { cliente: true },
    });

    if (!user) throw new BadRequestException('Usuario no existe');
    if (user.cliente) throw new BadRequestException('Este usuario ya tiene un cliente asociado');

    return this.prisma.cliente.create({
      data: {
        nombres: dto.nombres,
        apellidos: dto.apellidos,
        telefono: dto.telefono,
        curp: dto.curp,
        usuarioId: dto.usuarioId,
      },
      include: {
        usuario: true,
        credito: { include: { pagos: true } },
      },
    });
  }

  async findOne(id: number) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id },
      include: {
        usuario: true,
        credito: { include: { pagos: true } },
      },
    });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    return cliente;
  }

  findAll() {
    return this.prisma.cliente.findMany({
      include: {
        usuario: true,
        credito: { include: { pagos: true } },
      },
    });
  }

  async update(id: number, dto: UpdateClienteDto) {
    await this.findOne(id);

    return this.prisma.cliente.update({
      where: { id },
      data: {
        ...(dto.nombres   !== undefined ? { nombres: dto.nombres }   : {}),
        ...(dto.apellidos !== undefined ? { apellidos: dto.apellidos } : {}),
        ...(dto.telefono  !== undefined ? { telefono: dto.telefono }  : {}),
        ...(dto.curp      !== undefined ? { curp: dto.curp }          : {}),
      },
      include: {
        usuario: true,
        credito: { include: { pagos: true } },
      },
    });
  }

  async remove(id: number) {
    const cliente = await this.findOne(id);

    await this.prisma.$transaction(async (tx) => {
      if (cliente.credito) {
        await tx.pago.deleteMany({ where: { creditoId: cliente.credito.id } });
        await tx.credito.delete({ where: { id: cliente.credito.id } });
      }
      await tx.cliente.delete({ where: { id } });
    });

    return { message: 'cliente eliminado satisfactoriamente', id };
  }
}
