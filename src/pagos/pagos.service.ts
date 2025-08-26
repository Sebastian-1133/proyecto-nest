import { BadRequestException, Injectable, NotAcceptableException, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreatePagoDto } from "src/creditos/dto/create-pago.dto";

@Injectable ()
export class PagosService{
    constructor (private prisma: PrismaService){}

    async create(dto: CreatePagoDto){
        if (dto.monto <= 0) throw new   BadRequestException ('Monto debe de ser mayor a 0');

            return this.prisma.$transaction(async (tx) =>{
                const credito = await tx.credito.findUnique({where: {id: dto.creditoId}});
                if (!credito) throw new NotFoundException('Credito no encontrado');

                const pago = await tx.pago.create({data: {creditoId:dto.creditoId, monto: dto.monto}});

                const agg = await tx.pago.aggregate({
                    where: {creditoId: dto.creditoId},
                    _sum: {monto: true},
                });
                const totalPagado = Number (agg._sum.monto || 0);
                const saldo = credito.monto = totalPagado;

                await tx.credito.update({
                    where: {id: credito.id},
                    data: {estado: saldo<= 0 ? 'LIQUIDADO' : 'ACTIVO'},
                });
                return pago;
            });
    }
}