// src/services/categories.ts
export interface Categorie {
  id?: number;
  nombre: string;
  descripcion?: string;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function obtenerCategories(): Promise<Categorie[]> {
  const token = localStorage.getItem("token");
  const res = await fetch(`${baseUrl}/categories`, {
    cache: "no-store",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });

  if (!res.ok) {
    console.error("Error al obtener categorías", res.status);
    return [];
  }

  return res.json();
}

export async function crearCategories(data: Categorie) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${baseUrl}/categories`, {
    method: "POST",
    headers: { 
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(errorData.message || "Error al crear la categoría");
  }

  return res.json(); // Opcional si quieres devolver el objeto creado
}


export async function editarCategories(id: number, data: Categorie) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  await fetch(`${baseUrl}/categories/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(data),
  });
}


export async function eliminarCategories(id: number) {
  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await fetch(`${baseUrl}/categories/${id}`, {
    method: "DELETE",
    headers: {
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  if (!res.ok) {
    console.error("Error al eliminar categoría", res.status);
    throw new Error("No se pudo eliminar la categoría");
  }
}
