"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categorie } from "@/services/categories";

const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
});

export type CategorieFormData = z.infer<typeof schema>;

interface Props {
  initialData?: Categorie;
  onSubmit: (data: CategorieFormData) => void;
}

export default function CategorieForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CategorieFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      descripcion: initialData?.descripcion || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md space-y-6 mt-6">
      <h2 className="text-3xl font-bold text-gray-800 text-center"  >Seccion Categoria</h2>
      <div>
        <label className="block text-gray-700 font-semibold mb-1" htmlFor="nombre">Nombre:</label>
        <input
          id="nombre"
          {...register("nombre")}
          className="w-full placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Nombre de la categoría"
        />
        {errors.nombre && (
          <p className="mt-1 text-red-500 text-sm">{errors.nombre.message}</p>
        )}
      </div>

      <div>
        <label className="block text-gray-700 font-semibold mb-1" htmlFor="descripcion">Descripción:</label>
        <textarea
          id="descripcion"
          {...register("descripcion")}
          className="w-full placeholder-gray-400 border border-gray-300 rounded-md px-3 py-2 resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={4}
          placeholder="Descripción de la categoría (opcional)"
        />
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
