// src/app/categories/nueva/page.tsx
"use client";

import { useRouter } from "next/navigation";
import CategorieForm, { CategorieFormData } from "@/components/categories/CategorieForm";
import { crearCategories } from "@/services/categories";
import Navbar from "@/components/Navbar";

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
      <Navbar />
      <CategorieForm onSubmit={handleCreate} />
    </div>
  );
}
