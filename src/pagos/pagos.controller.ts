import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";   
import { PagosService } from "./pagos.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CreatePagoDto } from "src/creditos/dto/create-pago.dto";

@UseGuards (JwtAuthGuard)
@Controller ('Pagos')
export class PagosController{
    constructor (private readonly pagosServie: PagosService) {}
    @Post() create (@Body() dto: CreatePagoDto) {return this.pagosServie.create(dto);
    }
}