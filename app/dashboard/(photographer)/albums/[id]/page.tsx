"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useAlbumStore } from "@/store/useAlbumStore";
import { useParams } from "next/navigation";
import bcrypt from "bcryptjs";
import FormInput from "@/components/dashboard/Albums/FormInput";
import { MessageCirclePlus } from "lucide-react";

export default function AlbumDetailPage() {
  const id = useParams()?.id as string;
  const { currentAlbum, getAlbumById, loading, error } = useAlbumStore();

  const [form, setForm] = useState({
    title: "",
    userEvent: "",
    password: "",
    prices: [] as { size: string; price: number }[],
    priceDigital: 0,
    priceSchoolSports: 0,
    eventDate: "",
    clientEmail: "",
    clientPhoneNumber: "",
    description: "",
    isActiveFolder: false,
  });

  useEffect(() => {
    if (id) getAlbumById(id);
  }, [id, getAlbumById]);

  useEffect(() => {
    if (currentAlbum) {
      setForm({
        title: currentAlbum.title,
        userEvent: currentAlbum.userEvent,
        password: "",
        prices: currentAlbum.prices || [],
        priceDigital: currentAlbum.priceDigital || 0,
        priceSchoolSports: currentAlbum.priceSchoolSports || 0,
        eventDate: currentAlbum.eventDate
          ? new Date(currentAlbum.eventDate).toISOString().slice(0, 10)
          : "",
        clientEmail: currentAlbum.clientEmail,
        clientPhoneNumber: currentAlbum.clientPhoneNumber,
        description: currentAlbum.description,
        isActiveFolder: currentAlbum.isActiveFolder,
      });
    }
  }, [currentAlbum]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type, checked } = target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handlePriceChange = (index: number, value: string) => {
    setForm((prev) => {
      const updatedPrices = [...prev.prices];
      updatedPrices[index].price = parseFloat(value);
      return { ...prev, prices: updatedPrices };
    });
  };

  const handleSave = async () => {
    if (!currentAlbum) return;

    let hashedPassword = currentAlbum.passwordEventHash;
    if (form.password) {
      hashedPassword = await bcrypt.hash(form.password, 10);
    }

    const payload = {
      ...form,
      password: hashedPassword,
    };

    console.log("Payload a enviar:", payload);
    alert("Guardado simulado");
  };

  if (!id) return <p>ID inválido</p>;
  if (loading) return <p>Cargando...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!currentAlbum) return <p>Álbum no encontrado</p>;

  return (
    <div className="px-6 min-h-screen space-y-6">
      {/* Formulario de edición */}
      <div className="bg-white shadow rounded-xl p-4 space-y-4">
        <h2 className="text-xl font-bold mb-4">Editar Álbum</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          <FormInput
            label="Título"
            name="title"
            value={form.title}
            onChange={handleChange}
          />
          <FormInput
            label="Usuario Evento"
            name="userEvent"
            value={form.userEvent}
            onChange={handleChange}
          />
          <FormInput
            label="Password"
            name="password"
            value={form.password}
            onChange={handleChange}
            placeholder="Dejar vacío si no cambia"
            type="password"
          />
          <FormInput
            label="Fecha del Evento"
            name="eventDate"
            value={form.eventDate}
            onChange={handleChange}
            type="date"
          />
          <FormInput
            label="Email Cliente"
            name="clientEmail"
            value={form.clientEmail}
            onChange={handleChange}
            type="email"
          />
          <FormInput
            label="Teléfono Cliente"
            name="clientPhoneNumber"
            value={form.clientPhoneNumber}
            onChange={handleChange}
          />
          <div className="col-span-full">
            <FormInput
              label="Descripción"
              name="description"
              value={form.description}
              onChange={handleChange}
              textarea
            />
          </div>

          {/* Precios por tamaño */}
          <div className="col-span-full">
            <h3 className="text-sm font-medium mb-2">Precios por tamaño</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {form.prices.map((p, idx) => (
                <FormInput
                  key={idx}
                  label={p.size}
                  name={`price-${idx}`}
                  value={p.price}
                  onChange={(e) => handlePriceChange(idx, e.target.value)}
                  type="number"
                />
              ))}
            </div>
          </div>

          <FormInput
            label="Precio Digital"
            name="priceDigital"
            value={form.priceDigital}
            onChange={handleChange}
            type="number"
          />
          <FormInput
            label="Precio School Sports"
            name="priceSchoolSports"
            value={form.priceSchoolSports}
            onChange={handleChange}
            type="number"
          />
        </div>

        <div className="flex items-center space-x-10 mt-4">
          <FormInput
            label="Álbum activo"
            name="isActiveFolder"
            value={form.isActiveFolder}
            onChange={handleChange}
            type="checkbox"
            placeholder="Álbum activo"
          />
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded text-white bg-cyan-600 hover:bg-cyan-700 mt-4"
          >
            Guardar
          </button>
        </div>
      </div>

      {/* Grid de fotos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {currentAlbum.photos?.length > 0 ? (
          currentAlbum.photos.map((photo) => (
            <div
              key={photo.id}
              className="relative w-full h-48 rounded overflow-hidden shadow"
            >
              <Image
                src={photo.url}
                alt={`Foto ${photo.id}`}
                fill
                style={{ objectFit: "cover" }}
                className="rounded"
                unoptimized
              />
              <button
                onClick={() => console.log("Borrar foto:", photo.id)}
                className="absolute bottom-2 right-2 bg-red-600 text-white rounded-full w-8 h-8 flex items-center justify-center"
              >
                X
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center">
            No hay fotos en este álbum.
          </p>
        )}

        {/* Subir nuevas fotos */}
        <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 rounded h-48 cursor-pointer">
          <MessageCirclePlus className="w-16 h-16 text-gray-400" />

          <label className="text-gray-500">
            Subir foto
            <input
              type="file"
              className="hidden"
              onChange={(e) =>
                console.log("Archivo seleccionado:", e.target.files)
              }
              multiple
            />
          </label>
        </div>
      </div>
    </div>
  );
}
