export default function EditAlbumPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Editar Álbum {params.id}</h1>
    </div>
  );
}
