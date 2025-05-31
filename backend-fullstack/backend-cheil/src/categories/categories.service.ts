// src/categories/categories.service.ts

import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
    constructor(private prisma: PrismaService) { }

    async create(data: CreateCategoryDto) {
        // Validar que no exista una categoría con el mismo nombre
        const existing = await this.prisma.categoria.findUnique({
            where: { nombre: data.nombre },
        });

        if (existing) {
            throw new ConflictException('Ya existe una categoría con ese nombre');
        }

        return this.prisma.categoria.create({ data });
    }

    // listar todas las categorias 
    findAll() {
        return this.prisma.categoria.findMany({
            orderBy: { createdAt: 'desc' },
        });
    }

    // Buscar por Id
    async findOne(id: number) {
        const categoria = await this.prisma.categoria.findUnique({
            where: { id },
        });

        if (!categoria) {
            throw new NotFoundException(`Categoría con ID ${id} no encontrada`);
        }

        return categoria;
    }


    // Actualizar una categoria 
    async update(id: number, dto: UpdateCategoryDto) {
        const category = await this.prisma.categoria.findUnique({ where: { id } });

        if (!category) {
            throw new Error(`Categoría con ID ${id} no encontrada`);
        }

        return this.prisma.categoria.update({
            where: { id },
            data: dto,
        });
    }

    // Eliminar una categoria 
    async remove(id: number) {
        const category = await this.prisma.categoria.findUnique({ where: { id } });

        if (!category) {
            throw new Error(`Categoría con ID ${id} no encontrada`);
        }

        return this.prisma.categoria.delete({
            where: { id },
        });
    }

}
