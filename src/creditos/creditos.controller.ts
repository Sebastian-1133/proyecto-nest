import { Controller, Post, Body, Get, Param, ParseIntPipe, UseGuards } from "@nestjs/common";   
import { CreditosService } from "./creditos.service";
import { CreateCreditoDto } from "./dto/create-credito.dto";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";

@UseGuards (JwtAuthGuard)
@Controller('Creditos')
export class CreditosController{
    constructor(private readonly cretosService: CreditosService) {}

    @Post() create(@Body() dto:CreateCreditoDto) {return this.cretosService.create(dto);}
    @Get(':id') getById(@Param('id', ParseIntPipe) id: number){return this.cretosService.getById(id);
    }
}