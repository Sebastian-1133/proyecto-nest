import { Module } from "@nestjs/common";
import { CreditosService } from "./creditos.service";
import { CreditosController } from "./creditos.controller";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";

@Module({
    imports: [AuthModule],
    controllers: [CreditosController],
    providers: [CreditosService,PrismaService],
    exports: [CreditosService],
})
export class CreditosModule {}
