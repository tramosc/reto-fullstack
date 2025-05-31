"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@/services/products";
import { useEffect, useState } from "react";
import { obtenerCategories, Categorie } from "@/services/categories";

const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  precio: z.coerce.number().min(0, "El precio debe ser mayor o igual a 0"),
  descripcion: z.string().optional(),
  categoriaId: z.coerce.number({ invalid_type_error: "Selecciona una categoría" }),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialData?: Product;
  onSubmit: (data: FormData) => void;
}

export default function ProductForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      precio: initialData?.precio || 0,
      descripcion: initialData?.descripcion || "",
      categoriaId: initialData?.categoriaId ? Number(initialData.categoriaId) : undefined,
    },
  });

  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const data = await obtenerCategories();
      setCategories(data);

      // Aquí actualizas los valores del formulario cuando tienes datos y también initialData
      reset({
        nombre: initialData?.nombre || "",
        precio: initialData?.precio || 0,
        descripcion: initialData?.descripcion || "",
        categoriaId: initialData?.categoriaId ? Number(initialData.categoriaId) : undefined,
      });

    };
    fetchCategories();
  }, [initialData, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md space-y-6 mt-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center"  >Agregar Productos</h2>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Nombre</label>
        <input
          {...register("nombre")}
          className="w-full placeholder-gray-500 border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre del producto"
        />
        {errors.nombre && <p className="mt-1 text-red-500 text-sm">{errors.nombre.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Precio</label>
        <input
          type="number"
          step="1.00"
          {...register("precio")}
          className="w-full border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700"
          placeholder="0.00"
        />
        {errors.precio && <p className="mt-1 text-red-500 text-sm">{errors.precio.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Categoría</label>
        <select
          {...register("categoriaId")}
          className="w-full border rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-gray-700"
        >
          <option className="text-gray-700" value="">Selecciona una categoría</option>
          {categories.map((cat) => (
            <option className="text-gray-700" key={cat.id} value={cat.id}>
              {cat.nombre}
            </option>
          ))}
        </select>
        {errors.categoriaId && <p className="mt-1 text-red-500 text-sm">{errors.categoriaId.message}</p>}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1">Descripción</label>
        <textarea
          {...register("descripcion")}
          className="w-full placeholder-gray-500 border border-gray-700 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Descripción del producto (opcional)"
        />
        {errors.descripcion && <p className="mt-1 text-red-500 text-sm">{errors.descripcion.message}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-2 rounded-md hover:bg-blue-700 transition"
      >
        {initialData ? "Actualizar" : "Crear"}
      </button>
    </form>

  );
}
