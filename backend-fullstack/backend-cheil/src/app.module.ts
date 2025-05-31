import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AuthModule, UsersModule, CategoriesModule, ProductsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
