"use client";

import { useEffect, useRef } from "react";
import { Star } from "lucide-react";
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

export default function InfiniteAutoCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const speed = 1; // píxeles por tick
    const interval = 50; // milisegundos (≈50 veces por segundo → 50px/s)

    const id = setInterval(() => {
      if (track.scrollLeft >= track.scrollWidth / 2) {
        track.scrollLeft = 0;
      } else {
        track.scrollLeft += speed;
      }
    }, interval);

    return () => clearInterval(id);
  }, []);

  return (
    <section
      className="relative w-full md:w-10/12 mx-auto py-16 bg-white overflow-hidden"
      id="testimonials"
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-900">
          Testimonios
        </h2>

        <div className="relative">
          <div className="absolute left-0 top-0 w-2 md:w-16 h-full bg-gradient-to-r from-white to-transparent z-10" />
          <div className="absolute right-0 top-0 w-2 md:w-16 h-full bg-gradient-to-l from-white to-transparent z-10" />

          <div
            ref={trackRef}
            className="flex gap-6 overflow-hidden"
            /*     style={{ scrollBehavior: "smooth" }} */
          >
            {[...testimonials, ...testimonials].map((item, idx) => (
              <div
                key={idx}
                className="flex-shrink-0 w-[90%] sm:w-[50%] lg:w-[40%]"
              >
                <div className="w-full h-[480px] md:h-[460px] lg:h-[450px] bg-gray-50 p-6 rounded-lg shadow text-center mx-2 flex flex-col justify-between items-center">
                  <div className="flex justify-center mb-4">
                    <Image
                      src={item.avatar}
                      alt={item.name}
                      width={80}
                      height={80}
                      className="object-cover w-40 h-40 rounded-full ring-2 ring-cyan-200"
                    />
                  </div>
                  <p className="italic text-gray-700 mb-4 text-sm md:text-base">
                    "{item.text}"
                  </p>
                  <div className="flex justify-center mb-2 space-x-1">
                    {Array.from({ length: item.rating }).map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>
                  <h4 className="font-bold text-gray-900">{item.name}</h4>
                  <p className="text-sm text-cyan-600">{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
