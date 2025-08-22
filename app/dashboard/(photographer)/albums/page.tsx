"use client";
import React, { useEffect } from "react";
import Image from "next/image";
import { useAlbumStore } from "@/store/useAlbumStore";
import { useRouter } from "next/navigation";

export default function AlbumScreen() {
  const { albums, getAlbums, removeAlbum, loading, error } = useAlbumStore();

  const router = useRouter();

  useEffect(() => {
    if (albums.length === 0) {
      getAlbums();
    }
  }, [albums]);

  const handleAction = async (action: string, albumId: string) => {
    switch (action) {
      case "ver":
        router.push(`/dashboard/albums/${albumId}`);
        break;
      case "modificar":
        router.push(`/dashboard/albums/${albumId}/edit`);
        break;
      case "pedidos":
        router.push(`/dashboard/albums/${albumId}/orders`);
        break;
      case "eliminar":
        if (window.confirm(`¿Seguro quieres eliminar este álbum?`)) {
          // Acá deberías también llamar a la API DELETE si existe
          removeAlbum(albumId);
        }
        break;
    }
  };

  if (loading) return <p className="p-6">Cargando...</p>;
  if (error) return <p className="p-6 text-red-600">{error}</p>;

  return (
    <div className="min-h-screen px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
          Mis Álbumes
        </h1>

        {albums.length === 0 ? (
          <p className="text-gray-500 text-center text-lg">
            Aún no tienes álbumes creados.
          </p>
        ) : (
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Álbum
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cliente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {albums.map((album) => (
                  <tr key={album.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-12 w-12 relative">
                          <Image
                            src={
                              album.photos?.[0]?.url ||
                              "https://via.placeholder.com/150"
                            }
                            alt={`Portada de ${album.name}`}
                            fill
                            style={{ objectFit: "cover" }}
                            className="rounded-lg"
                            unoptimized
                          />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 truncate max-w-xs">
                            {album.name}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            {album.clientPhoneNumber}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {album.clientEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(album.createdAt).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex justify-end space-x-2">
                        <button
                          onClick={() => handleAction("ver", album.id)}
                          className="text-indigo-600 hover:text-indigo-900"
                        >
                          Ver
                        </button>
                        <button
                          onClick={() => handleAction("modificar", album.id)}
                          className="text-gray-600 hover:text-gray-900"
                        >
                          Modificar
                        </button>
                        <button
                          onClick={() => handleAction("pedidos", album.id)}
                          className="text-green-600 hover:text-green-900"
                        >
                          Pedidos
                        </button>
                        <button
                          onClick={() => handleAction("eliminar", album.id)}
                          className="text-red-600 hover:text-red-900"
                        >
                          Eliminar
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
