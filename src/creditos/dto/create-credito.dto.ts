import { from } from "rxjs";
import {IsInt, IsNumber, Min } from 'class-validator';
import { Type } from "class-transformer";

export class CreateCreditoDto{
    @Type(() => Number) @IsInt()
    clienteId: number;

    @Type (() => Number) @IsNumber() @Min(0.01)
    monto: number;
}