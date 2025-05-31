"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { obtenerProducts, eliminarProduct, Product } from "@/services/products";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const fetchData = async () => {
    const data = await obtenerProducts();
    setProducts(data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleDelete = async (id: number) => {
    if (confirm("¿Estás seguro de que quieres eliminar este producto ?")) {
      try {
        await eliminarProduct(id);
        await fetchData(); // Recargar la lista
      } catch (error) {
        console.error("Error al eliminar categoría", error);
      }
    }
  };


  return (
<div className="max-w-4xl mt-6 mx-auto p-6 bg-white rounded-md shadow-md">
  <div className="flex justify-between items-center mb-6">
    <h1 className="text-3xl font-bold text-gray-800">Productos</h1>
    <Link
      href="/products/nueva"
      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
    >
      + Nuevo Producto
    </Link>
  </div>

  <ul className="space-y-4">
    {products.map((product) => (
      <li
        key={product.id}
        className="flex justify-between items-center p-4 border border-gray-200 rounded hover:shadow-sm transition"
      >
        <div>
          <strong className="text-lg text-gray-900">{product.nombre}</strong>
          <span className="ml-2 text-gray-600">${product.precio}</span>
        </div>

        <div className="space-x-4">
          <Link
            href={`/products/editar/${product.id}`}
            className="text-green-600 hover:text-green-800 font-semibold"
          >
            Editar
          </Link>

          <button
            onClick={() => handleDelete(product.id!)}
            className="text-red-600 hover:text-red-800 font-semibold"
          >
            Eliminar
          </button>
        </div>
      </li>
    ))}
  </ul>
</div>
  );
}
