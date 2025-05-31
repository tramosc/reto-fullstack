// src/services/products.ts
export interface Product {
  id?: number;
  nombre: string;
  descripcion?: string;
  precio: number;
  categoriaId?: number; // Relación si usas categorías
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function obtenerProducts(): Promise<Product[]> {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(`${baseUrl}/products`, {
      headers: {
        "Authorization": `Bearer ${token}`,
      },
      cache: "no-store",
    });

    const result = await res.json();
    console.log("Respuesta cruda del backend:", result);

    if (!Array.isArray(result.data)) {
      console.error("Respuesta inesperada del backend:", result);
      return [];
    }

    return result.data; // ✅ ahora devolvemos solo el array
  } catch (error) {
    console.error("Error en obtenerProducts:", error);
    return [];
  }
}




export async function crearProduct(data: Product) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/products`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("No se pudo crear el producto");
}

export async function editarProduct(id: number, data: Product) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) throw new Error("No se pudo editar el producto");
}

export async function eliminarProduct(id: number) {
  const token = localStorage.getItem("token");

  const res = await fetch(`${baseUrl}/products/${id}`, {
    method: "DELETE",
    headers: token ? { Authorization: `Bearer ${token}` } : {},
  });

  if (!res.ok) throw new Error("No se pudo eliminar el producto");
}

export async function obtenerProductPorId(id: number): Promise<Product> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${baseUrl}/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    throw new Error("Error al obtener producto");
  }

  return res.json();
}
