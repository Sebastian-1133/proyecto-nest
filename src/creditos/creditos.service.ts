import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCreditoDto } from './dto/create-credito.dto';

@Injectable()
export class CreditosService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateCreditoDto) {
    const cliente = await this.prisma.cliente.findUnique({
      where: { id: dto.clienteId },
      include: { credito: true },
    });
    if (!cliente) throw new NotFoundException('Cliente no encontrado');
    if (cliente.credito) throw new BadRequestException('El cliente ya tiene un crédito');

    const credito = await this.prisma.credito.create({
      data: { clienteId: dto.clienteId, monto: dto.monto, estado: 'ACTIVO' },
      include: { pagos: true },
    });
    const totalPagado = 0;
    const saldo = credito.monto - totalPagado;
    return { ...credito, totalPagado, saldo };
  }

  async getById(id: number) {
    const c = await this.prisma.credito.findUnique({
      where: { id },
      include: { pagos: true, cliente: true },
    });
    if (!c) throw new NotFoundException('Crédito no encontrado');

    const totalPagado = c.pagos.reduce((a, p) => a + p.monto, 0);
    const saldo = c.monto - totalPagado;
    if (saldo <= 0 && c.estado !== 'LIQUIDADO') {
      await this.prisma.credito.update({ where: { id: c.id }, data: { estado: 'LIQUIDADO' } });
      c.estado = 'LIQUIDADO';
    }
    return { ...c, totalPagado, saldo };
  }

  async getByCliente(clienteId: number) {
    const c = await this.prisma.credito.findUnique({
      where: { clienteId },
      include: { pagos: true, cliente: true },
    });
    if (!c) throw new NotFoundException('El cliente no tiene crédito');

    const totalPagado = c.pagos.reduce((a, p) => a + p.monto, 0);
    const saldo = c.monto - totalPagado;
    if (saldo <= 0 && c.estado !== 'LIQUIDADO') {
      await this.prisma.credito.update({ where: { id: c.id }, data: { estado: 'LIQUIDADO' } });
      c.estado = 'LIQUIDADO';
    }
    return { ...c, totalPagado, saldo };
  }
}
