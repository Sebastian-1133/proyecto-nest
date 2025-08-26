import { Controller, Get, Param, ParseIntPipe,UseGuards } from "@nestjs/common";
import { CreditosService } from "src/creditos/creditos.service";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards (JwtAuthGuard)
@Controller ('clientes')
export class ClienteCreditoController{
    constructor(private readonly creditosService: CreditosService) {}
        @Get (':clienteId/Credito')
        getByCliente (@Param('cliente id', ParseIntPipe) clienteId: number) {
            return this.creditosService.getByCliente(clienteId);
        }

    
}