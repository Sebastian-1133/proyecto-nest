import { IsInt, IsNumber, Min } from "class-validator";
import { Type } from "class-transformer";

export class CreatePagoDto{
    @Type(()=> Number) @IsInt()
    creditoId:number;

    @Type(() => Number) @IsNumber () @Min(0.01)
    monto; number;
}