"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import { crearProduct } from "@/services/products";

export default function NuevaProductoPage() {
  const router = useRouter();

  async function handleSubmit(data: { nombre: string; precio: number; descripcion?: string }) {
    try {
      await crearProduct(data);
      router.push("/products");
    } catch (error) {
      console.error("Error al crear producto", error);
    }
  }

  return (
    <div>
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
