"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import {
  obtenerCategories,
  eliminarCategories,
  Categorie,
} from "@/services/categories";
import Navbar from "@/components/Navbar";

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
    <>
      <Navbar />
      <div className="max-w-4xl mx-auto">

        <div className="flex flex-row items-start justify-between content-center mt-6">
          <h2 className="text-2xl font-bold mb-4 text-center">Listado de Categorias</h2>
          <Link
            href="/categories/nueva"
            className="bg-transparent hover:bg-green-900 text-gray-900 font-semibold hover:text-white py-2 px-4 border bg-green-900 hover:border-transparent rounded"
          >
            + Nueva Categoria
          </Link>
        </div>
        <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3 border-b text-left text-gray-700">Nombre</th>
              <th className="p-3 border-b text-left text-gray-700">Descripción</th>
              <th className="p-3 border-b text-left text-gray-700">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {categories.length > 0 ? (
              categories.map((cat) => (
                <tr key={cat.id} className="hover:bg-gray-50">
                  <td className="p-3 border-b">{cat.nombre}</td>
                  <td className="p-3 border-b">{cat.descripcion}</td>
                  <td className="p-3 border-b space-x-2">
                    <Link
                      href={`/categories/editar/${cat.id}`}
                      className="text-green-600 hover:underline"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(cat.id!)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center p-3">
                  No hay categorías.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>

  );
}
