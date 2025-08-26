// src/clientes/clientes.controller.ts
import { Controller, Get, Post, Body, Param, ParseIntPipe, Put, Delete } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { CreateClienteDto } from 'src/users/dto/create-cliente.dto';
import { UpdateClienteDto } from 'src/users/dto/update-cliente.dto';

@Controller('clientes')
export class ClientesController {
  constructor(private readonly clientesService: ClientesService) {}

  @Get() 
  findAll() {
    return this.clientesService.findAll();
  }

  @Post()
  create(@Body() dto: CreateClienteDto) {
    return this.clientesService.create(dto);
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.clientesService.findOne(id);
  }
  @Put (':id')
  update (@Param('id',ParseIntPipe) id: number, @Body () dto: UpdateClienteDto){
    return this.clientesService.update(id, dto);
  }
  @Delete (':id')
  remove ( @Param('id', ParseIntPipe) id: number ){
    return this.clientesService.remove(id);
  }
}
