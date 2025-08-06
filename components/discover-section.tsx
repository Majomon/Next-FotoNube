"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Share2,
  ImageIcon,
  Smartphone,
  CreditCard,
  Users,
} from "lucide-react";

export default function DiscoverSection() {
  const features = [
    {
      icon: Camera,
      title: "Fotos y ventas en línea",
      description:
        "Publica tus álbumes en línea para que los clientes puedan ver las fotos de su evento social y venderlas fácilmente desde FOTONUBE.",
    },
    {
      icon: Share2,
      title: "Multiplica ventas",
      description:
        "Los álbumes de fotos de eventos que subas a FOTONUBE aparecerán en los buscadores, desarrollando así fotos y múltiples potenciales compradores que buscan fotos online de eventos específicos.",
    },
    {
      icon: ImageIcon,
      title: "Fotos ocasionales deportivas",
      description:
        'Con la función "Fotos ocasionales" puedes subir fotos de eventos deportivos que hayas cubierto para que los clientes puedan encontrar fácilmente las fotos.',
    },
    {
      icon: CreditCard,
      title: "Gestión de álbumes",
      description:
        "FOTONUBE te permite crear múltiples álbumes online para que puedas clasificar las fotos de diferentes eventos y que los clientes puedan encontrar fácilmente las fotos que buscan.",
    },
    {
      icon: Smartphone,
      title: "Acceso multiplataforma",
      description:
        "Cada uno de los álbumes que crees en FOTONUBE pueden ser vistos desde cualquier dispositivo móvil, tableta o computadora, permitiendo que tus clientes puedan ver y comprar las fotos desde cualquier lugar.",
    },
    {
      icon: Users,
      title: "Multi-dispositivo",
      description:
        "Uno de los puntos que más te va a FOTONUBE es que desarrollado para que se adapte perfectamente a cualquier dispositivo móvil, tableta o computadora, permitiendo el acceso desde cualquier plataforma.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50" id="descubre-fotonube">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            DESCUBRE FOTONUBE
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Conoce las funciones que ofrece FOTONUBE que convertirá tu cámara
            fotográfica en una forma de monetización y trabajo como fotógrafo.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4"
              >
                <feature.icon className="w-6 h-6 text-cyan-600" />
              </motion.div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
