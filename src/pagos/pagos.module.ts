import { Module } from "@nestjs/common";
import { PagosService } from "./pagos.service";
import { PagosController } from "./pagos.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [PagosController],
    providers: [PrismaService, PagosService],
})
export class PagosModule {}