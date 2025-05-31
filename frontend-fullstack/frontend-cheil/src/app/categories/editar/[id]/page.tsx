// src/app/categories/editar/[id]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Categorie, editarCategories, obtenerCategories } from "@/services/categories";
import Navbar from "@/components/Navbar";
import CategorieForm from "@/components/categories/CategorieForm";

export default function EditarCategoriaPage() {
  const [categoria, setCategoria] = useState<Categorie | null>(null);
  const router = useRouter();
  const params = useParams();

  useEffect(() => {
    async function fetchCategoria() {
      const data = await obtenerCategories();
      const id = Number(params.id);
      const encontrada = data.find((c) => c.id === id);
      if (encontrada) setCategoria(encontrada);
    }

    fetchCategoria();
  }, [params.id]);

  const handleSubmit = async (values: Categorie) => {
    if (!categoria?.id) return;
    await editarCategories(categoria.id, values);
    router.push("/categories");
  };

  if (!categoria) return <p>Cargando categoría...</p>;

  return (
    <div>
      <Navbar />
      <CategorieForm initialData={categoria} onSubmit={handleSubmit} />
    </div>
  );
}
