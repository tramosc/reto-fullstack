// src/prisma/prisma.module.ts
import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Global() // Esto lo hace disponible globalmente, si lo prefieres
@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Muy importante para que otros módulos lo puedan usar
})
export class PrismaModule {}