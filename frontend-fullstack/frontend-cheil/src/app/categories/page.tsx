"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  obtenerCategories,
  eliminarCategories,
  Categorie,
} from "@/services/categories";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Categorie[]>([]);

  const fetchData = async () => {
    const data = await obtenerCategories();
    setCategories(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar esta categoría?")) {
      try {
        await eliminarCategories(id);
        await fetchData(); // Recargar la lista
      } catch (error) {
        console.error("Error al eliminar categoría", error);
      }
    }
  };

  return (
    <div>
      <h1>Categorías</h1>
      <Link href="/categories/nueva">+ Nueva Categoría</Link>
      <ul>
        {categories.map((cat) => (
          <li key={cat.id}>
            <strong>{cat.nombre}</strong> - {cat.descripcion}
            {" | "}
            <Link href={`/categories/editar/${cat.id}`}>Editar</Link>
            {" | "}
            <button onClick={() => handleDelete(cat.id!)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
