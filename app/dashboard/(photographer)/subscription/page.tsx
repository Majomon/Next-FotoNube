"use client";
import Image from "next/image";
import React, { useState } from "react";

export default function SuscriptionScreen() {
  const [isUserPro, setIsUserPro] = useState(false);

  const handleSubscribe = () => {
    alert("Iniciando proceso de pago...");
    setIsUserPro(true);
  };

  const handleCancel = () => {
    alert("Tu suscripción ha sido cancelada.");
    setIsUserPro(false);
  };

  return (
    <div className="flex justify-center">
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-2xl shadow-lg">
        {/* LADO IZQUIERDO: Suscripción actual y beneficios */}
        <div className="flex flex-col justify-start">
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4">
            SUSCRIPCIÓN
          </h1>
          <p className="text-gray-600 font-light mb-6">
            Administra tu plan de FOTONUBE y potencia tu negocio.
          </p>

          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-2">
              Tu suscripción actual:
              <span className="ml-2 font-extrabold text-indigo-600">
                {isUserPro ? "FOTONUBE Pro" : "FOTONUBE Free"}
              </span>
            </h2>

            <ul className="text-gray-600 space-y-2 mt-4">
              {isUserPro ? (
                <>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Acceso
                    completo a todas las funciones.
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> 10 GB de
                    espacio en la nube.
                  </li>
                  <li className="flex items-center">
                    <span className="text-green-500 mr-2">✓</span> Comisión por
                    transacción 1,99%.
                  </li>
                </>
              ) : (
                <>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">●</span> Uso gratuito.
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">●</span> 1 GB de
                    espacio en la nube.
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">●</span> 1 albúm
                  </li>
                  <li className="flex items-center">
                    <span className="text-gray-400 mr-2">●</span> Comisión por
                    transacción 4,99%.
                  </li>
                </>
              )}
            </ul>

            <div className="mt-8 text-gray-500 text-sm">
              <p>
                <span className="font-semibold">Fotógrafo:</span> Charly Guzman
              </p>
              <p>
                <span className="font-semibold">Correo:</span>{" "}
                charlyguzman@msmail.com
              </p>
            </div>
          </div>
        </div>

        {/* LADO DERECHO: Upgrade a Pro o Cancelar */}
        <div className="flex flex-col items-center justify-center p-6 bg-gray-50 rounded-xl shadow-inner">
          {isUserPro ? (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Tu plan Pro está activo
              </h2>
              <button
                onClick={handleCancel}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-red-500 hover:bg-red-600 transition-colors shadow-md"
              >
                CANCELAR SUSCRIPCIÓN
              </button>
            </div>
          ) : (
            <div className="flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                Mejora tu plan a FOTONUBE Pro
              </h2>
              <p className="text-3xl font-extrabold text-gray-900 mb-1">
                USD 49.99
                <span className="text-base font-normal text-gray-500">
                  {" "}
                  /mes
                </span>
              </p>
              <ul className="text-gray-600 space-y-2 mt-4 text-sm text-left w-full">
                <li>• Publicación ilimitada de álbumes</li>
                <li>• 10 GB de espacio en la nube.</li>
                <li>• Comisión por transacción 1,99%</li>
              </ul>

              <button
                onClick={handleSubscribe}
                className="w-full py-4 px-6 rounded-xl font-bold text-lg text-white bg-indigo-600 hover:bg-indigo-700 transition-colors shadow-md mt-6"
              >
                SUSCRIBIRME
              </button>

              <div className="mt-4 text-xs text-gray-500 flex items-center">
                <p className="mr-2">Pago seguro con</p>
                <Image
                  src="/mercadopagoIcon.webp"
                  alt="Mercado Pago"
                  width={150}
                  height={150}
                  className="w-16 h-16 object-cover rounded-full"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
