"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login:", { email, password });
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
        <h2 className="text-2xl font-bold text-center mb-6">
          INICIAR SESIÓN/REGISTRARSE
        </h2>

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
            ACCEDER/REGISTRARSE
          </button>

          <div className="text-center text-sm text-gray-500">— o —</div>

          <button
            type="button"
            className="w-full border flex items-center justify-center gap-2 py-2 rounded-md hover:bg-gray-50"
          >
            <img src="/google-logo.svg" alt="Google" className="w-5 h-5" />
            CONTINUAR CON GOOGLE
          </button>

          <div className="text-center mt-4">
            <a href="#" className="text-sm text-blue-600 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}
