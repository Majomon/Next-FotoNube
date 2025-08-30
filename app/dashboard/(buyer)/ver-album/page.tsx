"use client";

import { useEffect, useState } from "react";
import claraApi from "@/lib/axios";
import Link from "next/link";

export default function BuyerAlbumsPage() {
  const [albums, setAlbums] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAlbums() {
      try {
        const { data } = await claraApi.get("/albums/my-albums");
        setAlbums(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAlbums();
  }, []);

  if (loading) return <p>Cargando álbumes...</p>;
  if (!albums.length) return <p>No tienes álbumes disponibles.</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {albums.map((album) => (
        <div
          key={album.id}
          className="border rounded-lg p-4 shadow hover:shadow-lg transition"
        >
          <h3 className="font-bold text-lg mb-2">{album.title}</h3>
          <p className="text-gray-500 mb-4">{album.eventDate}</p>
          <Link
            href={`/dashboard/ver-album/${album.id}`}
            className="bg-cyan-600 text-white px-4 py-2 rounded hover:bg-cyan-700"
          >
            Ver Álbum
          </Link>
        </div>
      ))}
    </div>
  );
}
