"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Categorie } from "@/services/categories";

const schema = z.object({
  nombre: z.string().min(1, "El nombre es obligatorio"),
  descripcion: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface Props {
  initialData?: Categorie;
  onSubmit: (data: FormData) => void;
}

export default function CategorieForm({ initialData, onSubmit }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      nombre: initialData?.nombre || "",
      descripcion: initialData?.descripcion || "",
    },
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Nombre:</label>
        <input {...register("nombre")} />
        {errors.nombre && <p>{errors.nombre.message}</p>}
      </div>
      <div>
        <label>Descripción:</label>
        <textarea {...register("descripcion")} />
      </div>
      <button type="submit">{initialData ? "Actualizar" : "Crear"}</button>
    </form>
  );
}
