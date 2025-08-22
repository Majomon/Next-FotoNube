"use client";
import { useEffect } from "react";
import { useAlbumStore } from "@/store/useAlbumStore";
import { useParams } from "next/navigation";

export default function AlbumDetailPage() {
  const params = useParams();
  const id = params?.id; // puede ser string | undefined

  const { albums, getAlbumById, loading, error } = useAlbumStore();
  const album = albums.find((a) => a.id === id);

  useEffect(() => {
    if (id && !album) {
      getAlbumById(id); // ahora TS sabe que id es string
    }
  }, [id, album, getAlbumById]);

  if (!id) return <p>ID inválido</p>;
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!album) return <p>Álbum no encontrado</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Detalle del Álbum {album.name}</h1>
      <p>{album.description}</p>
    </div>
  );
}
