import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateClienteDto {
    @IsString()
    @MinLength(2)
    nombres: string;

    @IsString()
    @MinLength(2)
    apellidos: string;

      @IsOptional()
    @IsString()
    telefono?: string;

      @IsOptional()
    @IsString()
    curp?: string;
    
}