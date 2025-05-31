"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import {
  Product,
  obtenerProductPorId,
  obtenerProducts,
  editarProduct,
} from "@/services/products";
import Navbar from "@/components/Navbar";
import ProductForm from "@/components/products/ProductForm";

export default function EditarProductPage() {
  const router = useRouter();
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      const id = Number(params.id);
      const data = await obtenerProductPorId(id);
      setProduct(data);
    }

    if (params?.id) {
      fetchProduct();
    }
  }, [params.id]);

  const handleSubmit = async (data: Product) => {
    const id = Number(params.id);

    // Verificar nombre duplicado
    const productos = await obtenerProducts();
    const yaExiste = productos.some(
      (p) =>
        p.id !== id &&
        p.nombre.trim().toLowerCase() === data.nombre.trim().toLowerCase()
    );

    if (yaExiste) {
      alert("Ya existe otro producto con ese nombre.");
      return;
    }

    await editarProduct(id, data);
    router.push("/products");
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div>
      <Navbar />
      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
}
