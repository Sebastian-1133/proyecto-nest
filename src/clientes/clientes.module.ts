import { Module } from '@nestjs/common';
import { ClientesService } from './clientes.service';
import { ClientesController } from './clientes.controller';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { ClienteCreditoController } from './cliente-credito.controller';
import { CreditosModule } from 'src/creditos/creditos.module';

@Module({
  imports: [PrismaModule],
  providers: [ClientesService],
  controllers: [ClientesController],
})
export class ClientesModule {}
