"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import claraApi from "@/lib/axios";

export default function AlbumAccessPage() {
  const [userEvent, setUserEvent] = useState("");
  const [passwordEvent, setPasswordEvent] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { data } = await claraApi.post("/albums/access", {
        userEvent,
        passwordEvent,
      });

      router.push(`/dashboard/ver-album/${data.albumId}`);
    } catch (err: any) {
      setError(err.response?.data?.message || "Credenciales incorrectas");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center h-full">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl flex overflow-hidden h-5/6">
        {/* Imagen lateral */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="https://res.cloudinary.com/majomon/image/upload/v1756475748/FotoNube/Email/banner-FOTONUBE-Mail_Bienvenida_Fotografos_Pro_jweua9.jpg"
            alt="Álbum"
            className="h-full w-full object-cover animate-fade-in"
          />
        </div>

        {/* Formulario */}
        <div className="w-full md:w-1/2 p-8 flex flex-col justify-center h-full">
          <h2 className="text-2xl font-bold mb-2 text-center animate-bounce">
            Acceder al Álbum
          </h2>
          <p className="text-center text-gray-500 mb-6">
            Ingresa las credenciales que te brindó el fotógrafo para ver tus
            fotos.
          </p>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 flex-1 flex flex-col justify-center"
          >
            <div>
              <label>Usuario del Evento</label>
              <input
                type="text"
                className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                value={userEvent}
                onChange={(e) => setUserEvent(e.target.value)}
                required
              />
            </div>

            <div>
              <label>Contraseña del Evento</label>
              <input
                type="password"
                className="w-full border rounded px-3 py-2 mt-1 focus:ring-2 focus:ring-cyan-400 focus:outline-none transition"
                value={passwordEvent}
                onChange={(e) => setPasswordEvent(e.target.value)}
                required
              />
            </div>

            {error && <p className="text-red-600 text-center">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-600 text-white py-2 rounded font-semibold hover:bg-cyan-700 transition flex justify-center items-center mt-auto"
            >
              {loading ? "Accediendo..." : "Acceder"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
