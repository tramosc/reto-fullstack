// src/app/categories/nueva/page.tsx
"use client";

import { useRouter } from "next/navigation";
import CategorieForm, { CategorieFormData } from "@/components/categories/CategorieForm";
import { crearCategories, obtenerCategories } from "@/services/categories";
import Navbar from "@/components/Navbar";

export default function NuevaCategoriePage() {
  const router = useRouter();

  async function handleCreate(data: CategorieFormData) {
    try {
      const existentes = await obtenerCategories();

      const yaExiste = existentes.some(
        (cat) => cat.nombre.trim().toLowerCase() === data.nombre.trim().toLowerCase()
      );

      if (yaExiste) {
        alert("Ya existe una categoría con ese nombre.");
        return;
      }

      await crearCategories(data);
      router.push("/categories");
    } catch (error) {
      console.error("Error al crear categoría:", error);
      alert("Error al crear categoría");
    }
  }

  return (
    <div>
      <Navbar />
      <CategorieForm onSubmit={handleCreate} />
    </div>
  );
}
