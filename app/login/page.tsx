"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("mauri.monzon91@gmail.com");
  const [password, setPassword] = useState("123456");

  const router = useRouter();
  const { login, status, error, user } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await login(email, password);

    if (!ok) {
      alert("Error: " + error);
      return;
    }

    router.push("/profile");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 relative">
      {/* Fondo con imagen dividida */}
      <div className="absolute inset-0 grid grid-cols-2">
        <img
          src="/left-bg.jpg"
          alt="left"
          className="w-full h-full object-cover"
        />
        <img
          src="/right-bg.jpg"
          alt="right"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* Contenido centrado */}
      <div className="z-10 bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
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
