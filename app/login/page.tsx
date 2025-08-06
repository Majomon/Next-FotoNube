"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("mauri.monzon91@gmail.com");
  const [password, setPassword] = useState("123456");

  const router = useRouter();
  const { login, status, error } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await login(email, password);

    if (!ok) {
      alert("Error: " + error);
      return;
    }

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Imagen de fondo con movimiento suave */}
      <div className="absolute inset-0">
        <img
          src="https://fotonube.com/websim/images/fondo-imagen-FOTONUBE-eventos.jpg"
          alt="Fondo Fotonube"
          className="w-full h-full object-cover animate-float-bg"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Formulario animado */}
      <div className="z-10 bg-white rounded-xl shadow-lg p-8 w-full max-w-md animate-fade-in-up">
        <h2 className="text-2xl font-bold text-center mb-6">INICIAR SESIÓN</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">
              Correo Electrónico
            </label>
            <input
              type="email"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Contraseña</label>
            <input
              type="password"
              className="w-full mt-1 px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition"
          >
            ACCEDER
          </button>
        </form>

        {status === "checking" && <p>Cargando...</p>}
        {status === "unauthenticated" && error && (
          <p className="text-red-600">{error}</p>
        )}
      </div>
    </div>
  );
}
