// src/components/Navbar.tsx
"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Navbar() {
  const router = useRouter();

  function handleLogout() {
    localStorage.removeItem("token");
    router.push("/login");
  }

  return (
    <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
      <div className="text-lg font-bold">
        <span>
          FullStack
        </span>
      </div>
      <div className="space-x-4">
        <Link href="/categories" className="hover:underline">
          Categorias
        </Link>
        <Link href="/products" className="hover:underline">
          Productos
        </Link>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 px-3 py-1 rounded"
        >
          Cerrar Sesion
        </button>
      </div>
    </nav>
  );
}
