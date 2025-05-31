"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import Navbar from "@/components/Navbar";
import { crearProduct, obtenerProducts } from "@/services/products";

export default function NuevaProductoPage() {
  const router = useRouter();

  async function handleSubmit(data: { nombre: string; precio: number; descripcion?: string }) {
    try {
      // Obtener todos los productos
      const productos = await obtenerProducts();

      // Validar nombre duplicado
      const yaExiste = productos.some(
        (p) => p.nombre.trim().toLowerCase() === data.nombre.trim().toLowerCase()
      );

      if (yaExiste) {
        alert("Ya existe un producto con ese nombre.");
        return;
      }

      await crearProduct(data);
      router.push("/products");
    } catch (error) {
      console.error("Error al crear producto", error);
    }
  }

  return (
    <div>
      <Navbar />
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
