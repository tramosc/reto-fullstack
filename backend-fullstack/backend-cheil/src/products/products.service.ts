// src/products/products.service.ts

import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateProductDto) {
    // Validar que no exista producto con mismo nombre
    const existing = await this.prisma.producto.findUnique({
      where: { nombre: dto.nombre },
    });
    if (existing) {
      throw new ConflictException('Ya existe un producto con ese nombre.');
    }

    return this.prisma.producto.create({
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        precio: dto.precio,
        categoriaId: dto.categoriaId,
      },
    });
  }

  async findAll(page = 1, limit = 10) {
    const skip = (page - 1) * limit;

    const [total, products] = await Promise.all([
      this.prisma.producto.count(),
      this.prisma.producto.findMany({
        skip,
        take: limit,
        include: {
          categoria: true,  // Para traer info de la categoría
        },
        orderBy: { createdAt: 'desc' },
      }),
    ]);

    return {
      total,
      page,
      limit,
      data: products,
    };
  }

  async findOne(id: number) {
    const product = await this.prisma.producto.findUnique({
      where: { id },
      include: { categoria: true },
    });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    return product;
  }

  async update(id: number, dto: UpdateProductDto) {
    // Verificar si el producto existe
    const product = await this.prisma.producto.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }

    // Validar nombre si se está actualizando y no cause duplicados
    if (dto.nombre && dto.nombre !== product.nombre) {
      const existing = await this.prisma.producto.findUnique({
        where: { nombre: dto.nombre },
      });
      if (existing) {
        throw new ConflictException('Ya existe un producto con ese nombre.');
      }
    }

    return this.prisma.producto.update({
      where: { id },
      data: {
        nombre: dto.nombre,
        descripcion: dto.descripcion,
        precio: dto.precio,
        categoriaId: dto.categoriaId,
      },
    });
  }

  async remove(id: number) {
    const product = await this.prisma.producto.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Producto con ID ${id} no encontrado.`);
    }
    return this.prisma.producto.delete({ where: { id } });
  }
}
