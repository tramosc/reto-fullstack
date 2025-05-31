"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { Product, obtenerProductPorId, editarProduct } from "@/services/products";
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
    await editarProduct(id, data);
    router.push("/products");
  };

  if (!product) return <div>Cargando...</div>;

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Editar Producto</h1>
      <ProductForm initialData={product} onSubmit={handleSubmit} />
    </div>
  );
}
