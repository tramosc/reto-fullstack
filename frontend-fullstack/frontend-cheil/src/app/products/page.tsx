"use client";

import { useEffect, useState } from "react";
import ProductsTable from "@/components/ProductsTable";
import { Product } from "@/services/products";
import Link from "next/link";
import { obtenerProducts, eliminarProduct } from "@/services/products";
import Navbar from "@/components/Navbar";
export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      const data = await obtenerProducts();
      setProducts(data);
      setLoading(false);
    };
    loadProducts();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro que quieres eliminar este producto?")) return;
    await eliminarProduct(id);
    setProducts(products.filter((p) => p.id !== id));
  };

  const sanitizedProducts = products.map(product => ({
    ...product,
    id: product.id ?? 0, // Asignar un id válido para evitar undefined
  }));

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;

  return (
    <div>
      <Navbar />
      <ProductsTable products={sanitizedProducts} onDelete={handleDelete} itemsPerPage={5} />
    </div>
  );
}
