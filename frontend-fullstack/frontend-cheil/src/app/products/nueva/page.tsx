"use client";

import { useRouter } from "next/navigation";
import ProductForm from "@/components/products/ProductForm";
import Navbar from "@/components/Navbar";
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
      <Navbar />
      <ProductForm onSubmit={handleSubmit} />
    </div>
  );
}
