"use client";

import { useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const testimonials = [
  {
    name: "Martín",
    role: "Fotógrafo Social",
    avatar:
      "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    text: "Con FOTONUBE creo álbumes de los casamientos que cubro y les paso a los novios el usuario y contraseña, ellos lo pasan a todos los invitados, entonces no sólo compran fotos de los novios, sino que también todos los que asistieron a la fiesta.",
    rating: 5,
  },
  {
    name: "Maria Elena ",
    role: "Fotógrafa Escolar",
    avatar:
      "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    text: "Con FOTONUBE organizo muy fácilmente la venta de fotos de colegios, creo los álbumes de comuniones, entrega de diplomas o las fotos anuales con carpeta, luego cobro en línea y recibo los pedidos por correo electrónico.",
    rating: 5,
  },
  {
    name: "Javier",
    role: "Fotógrafo Deportivo",
    avatar:
      "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    text: "Cubro eventos deportivos náuticos, mayormente en la categoría Optimist (niños y niñas de hasta 12 años). Con FOTONUBE creo álbumes de torneos y durante el evento entrego flyers a los padres para que compren fotos de sus hijos. ¡La venta es un éxito!",
    rating: 5,
  },
  {
    name: "Federico",
    role: "Fotoperiodismo Social",
    avatar:
      "https://images.pexels.com/photos/33283835/pexels-photo-33283835.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
    text: "Cubro marchas, protestas y movilizaciones en la ciudad de Buenos Aires, finalizado mi trabajo creo álbumes con el material y se lo envío directamente a las agencias de noticias y principales diarios, cobro en línea y las agencias descargan el material en línea.",
    rating: 5,
  },
];

export default function TestimonialCarousel() {
  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-6 text-gray-900">Testimonios</h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Botones */}
          <button
            onClick={prev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow"
          >
            <ChevronLeft />
          </button>

          <button
            onClick={next}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 bg-white border rounded-full shadow"
          >
            <ChevronRight />
          </button>

          {/* Testimonio actual */}
          <motion.div
            key={index}
            initial={{ x: 300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.4 }}
            className="px-8"
          >
            <div className="bg-gray-50 p-6 rounded-lg shadow-md">
              <div className="flex justify-center mb-4">
                <Image
                  src={testimonials[index].avatar}
                  alt={testimonials[index].name}
                  width={80}
                  height={80}
                  className="rounded-full ring-4 ring-cyan-200"
                />
              </div>
              <p className="italic text-gray-700 mb-4">
                "{testimonials[index].text}"
              </p>
              <div className="flex justify-center space-x-1 mb-2">
                {Array.from({ length: testimonials[index].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-yellow-400 text-yellow-400"
                    />
                  )
                )}
              </div>
              <h4 className="font-bold text-gray-900">
                {testimonials[index].name}
              </h4>
              <p className="text-sm text-cyan-600">
                {testimonials[index].role}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
