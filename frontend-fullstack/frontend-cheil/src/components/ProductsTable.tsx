import { useState } from "react";
import Link from "next/link";

interface Product {
    id?: number;
    nombre: string;
    precio: number;
    categoriaId?: number;
}

interface Props {
    products: Product[];
    onDelete: (id: number) => void;
    itemsPerPage: number;
}

export default function ProductsTable({ products, onDelete, itemsPerPage = 5 }: Props) {
    const [currentPage, setCurrentPage] = useState(1);

    const totalPages = Math.ceil(products.length / itemsPerPage);

    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentProducts = products.slice(startIndex, startIndex + itemsPerPage);

    const handlePrev = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const handleNext = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex flex-row items-start justify-between content-center mt-6">
                <h1 className="text-2xl font-bold mb-4 text-center">Lista de Productos</h1>
                <Link
                    href="/products/nueva"
                    className="bg-transparent hover:bg-green-900 text-gray-900 font-semibold hover:text-white py-2 px-4 border bg-green-900 hover:border-transparent rounded"
                >
                    + Nuevo Producto
                </Link>
            </div>
            <table className="min-w-full border border-gray-300 rounded-md overflow-hidden">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="p-3 border-b text-left text-gray-700">Nombre</th>
                        <th className="p-3 border-b text-left text-gray-700">Precio</th>
                        <th className="p-3 border-b text-left text-gray-700">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {currentProducts.map((product) => (
                        <tr key={product.id} className="hover:bg-gray-50">
                            <td className="p-3 border-b">{product.nombre}</td>
                            <td className="p-3 border-b">${product.precio}</td>
                            <td className="p-3 border-b space-x-2">
                                <Link
                                    href={`/products/editar/${product.id}`}
                                    className="text-green-600 hover:underline"
                                >
                                    Editar
                                </Link>
                                <button
                                    onClick={() => onDelete(product.id!)}
                                    className="text-red-600 hover:underline"
                                >
                                    Eliminar
                                </button>
                            </td>
                        </tr>
                    ))}
                    {currentProducts.length === 0 && (
                        <tr>
                            <td colSpan={3} className="text-center p-3">
                                No hay productos.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            {/* Paginación */}
            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={handlePrev}
                    disabled={currentPage === 1}
                    className={`px-4 py-2 rounded border ${currentPage === 1
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "text-blue-600 border-blue-600 hover:bg-blue-50"
                        }`}
                >
                    Anterior
                </button>

                <span>
                    Página {currentPage} de {totalPages}
                </span>

                <button
                    onClick={handleNext}
                    disabled={currentPage === totalPages}
                    className={`px-4 py-2 rounded border ${currentPage === totalPages
                            ? "text-gray-400 border-gray-300 cursor-not-allowed"
                            : "text-blue-600 border-blue-600 hover:bg-blue-50"
                        }`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    );
}
