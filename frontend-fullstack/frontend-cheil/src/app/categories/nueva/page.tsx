// src/app/categories/nueva/page.tsx
"use client";

import { useRouter } from "next/navigation";
import CategorieForm, { CategorieFormData } from "@/components/categories/CategorieForm";
import { crearCategories } from "@/services/categories";

export default function NuevaCategoriePage() {
  const router = useRouter();

  async function handleCreate(data: CategorieFormData) {
    try {
      await crearCategories(data);
      router.push("/categories"); // Redirige al listado
    } catch (error) {
      console.error("Error al crear categoría:", error);
    }
  }

  return (
    <div>
      <h1>Nueva Categoría</h1>
      <CategorieForm onSubmit={handleCreate} />
    </div>
  );
}
