export default function AlbumOrdersPage({
  params,
}: {
  params: { id: string };
}) {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Pedidos del Álbum {params.id}</h1>
    </div>
  );
}
