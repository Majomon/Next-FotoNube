"use client";

import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { createAlbum } from "@/actions/album/album.action";
import { AlbumData } from "@/interfaces/album/create-album.interface";

export default function NewAlbumScreen() {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AlbumData>({
    defaultValues: {
      title: "",
      userEvent: "",
      passwordEvent: "",
      prices: [
        { size: "S", price: 0 },
        { size: "M", price: 0 },
        { size: "L", price: 0 },
      ],
      priceDigital: 0,
      priceSchoolSports: 0,
      eventDate: "",
      clientEmail: "",
      clientPhoneNumber: "",
      description: "",
      isActiveFolder: true,
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "prices",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (data: AlbumData) => {
    setLoading(true);
    setMessage(null);

    const result = await createAlbum(data);

    if (result.success) {
      setMessage("Álbum creado correctamente!");
      reset();
      setTimeout(() => setMessage(null), 5000);
    } else {
      setMessage(result.error);
    }

    setLoading(false);
  };

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6 text-center">Crear Nuevo Álbum</h1>

      {message && <p className="mb-4 text-red-600 text-center">{message}</p>}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Título */}
        <div>
          <label className="font-medium">Nombre del evento</label>
          <input
            {...register("title", { required: "El título es obligatorio" })}
            placeholder=""
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.title && (
            <p className="text-red-600 text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* Usuario y contraseña */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Usuario del evento</label>
            <input
              {...register("userEvent", { required: "Usuario obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.userEvent && (
              <p className="text-red-600 text-sm">{errors.userEvent.message}</p>
            )}
          </div>
          <div>
            <label className="font-medium">Contraseña del evento</label>
            <input
              type="password"
              {...register("passwordEvent", {
                required: "Contraseña obligatoria",
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.passwordEvent && (
              <p className="text-red-600 text-sm">
                {errors.passwordEvent.message}
              </p>
            )}
          </div>
        </div>

        {/* Precios por tamaño */}
        <div>
          <label className="font-medium">Precios Copias Impresas</label>
          <div className="grid grid-cols-3 gap-4 mt-1">
            {fields.map((field, index) => (
              <div key={field.id}>
                <label className="text-sm">{field.size}</label>
                <input
                  type="number"
                  {...register(`prices.${index}.price` as const, {
                    valueAsNumber: true,
                    required: "Precio obligatorio",
                    min: { value: 0, message: "Debe ser mayor o igual a 0" },
                  })}
                  className="w-full p-2 border border-gray-300 rounded"
                  placeholder="Precio"
                />
                {errors.prices?.[index]?.price && (
                  <p className="text-red-600 text-sm">
                    {errors.prices[index]?.price?.message}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Otros precios */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium text-sm">Foto digital</label>
            <input
              type="number"
              {...register("priceDigital", { valueAsNumber: true, min: 0 })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div>
            <label className="font-medium text-sm">
              Carpeta escolar/deportiva
            </label>
            <input
              type="number"
              {...register("priceSchoolSports", {
                valueAsNumber: true,
                min: 0,
              })}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Fecha del evento */}
        <div>
          <label className="font-medium">Fecha del evento</label>
          <input
            type="date"
            {...register("eventDate", { required: "Fecha obligatoria" })}
            className="w-full p-2 border border-gray-300 rounded"
          />
          {errors.eventDate && (
            <p className="text-red-600 text-sm">{errors.eventDate.message}</p>
          )}
        </div>

        {/* Cliente */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="font-medium">Correo cliente</label>
            <input
              type="email"
              {...register("clientEmail", { required: "Correo obligatorio" })}
              className="w-full p-2 border border-gray-300 rounded"
            />
            {errors.clientEmail && (
              <p className="text-red-600 text-sm">
                {errors.clientEmail.message}
              </p>
            )}
          </div>
          <div>
            <label className="font-medium">Teléfono cliente</label>
            <input
              {...register("clientPhoneNumber")}
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label className="font-medium">Descripción del álbum</label>
          <textarea
            {...register("description")}
            className="w-full p-2 border border-gray-300 rounded"
          />
        </div>

        {/* Carpeta activa */}
        <div>
          <label className="font-medium">
            Carpeta activa (foto grupal + retrato)
          </label>
          <Controller
            control={control}
            name="isActiveFolder"
            render={({ field }) => (
              <div className="flex gap-4">
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={field.value === true}
                    onChange={() => field.onChange(true)}
                  />
                  Activar
                </label>
                <label className="flex items-center gap-1 cursor-pointer">
                  <input
                    type="radio"
                    checked={field.value === false}
                    onChange={() => field.onChange(false)}
                  />
                  Desactivar
                </label>
              </div>
            )}
          />
        </div>

        {/* Botones */}
        <div className="flex justify-center gap-4 pt-4">
          <button
            type="button"
            onClick={() => reset()}
            className="bg-gray-200 text-gray-800 px-6 py-2 rounded-full"
          >
            REINICIAR
          </button>
          <button
            type="submit"
            className="bg-cyan-600 text-white px-6 py-2 rounded-full"
            disabled={loading}
          >
            {loading ? "CREANDO..." : "CREAR ÁLBUM"}
          </button>
        </div>
      </form>
    </div>
  );
}
