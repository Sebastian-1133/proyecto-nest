import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ClientesModule } from './clientes/clientes.module'; // <-- agrega esto

@Module({
  imports: [AuthModule, UsersModule, PrismaModule, ClientesModule], // <-- y aquí
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
