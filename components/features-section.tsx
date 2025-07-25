"use client"

import { motion } from "framer-motion"
import { Upload, Eye, Star } from "lucide-react"

export default function FeaturesSection() {
  const features = [
    {
      icon: Upload,
      title: "Sube las fotos en línea",
      description:
        "Con FOTONUBE puedes publicar y vender las fotos de manera rápida desde tu teléfono, tableta o computadora de escritorio.",
    },
    {
      icon: Eye,
      title: "Multiplica las ventas de fotos",
      description:
        "Los álbumes de FOTONUBE se posicionan mejor en los buscadores, los clientes buscarán específicamente las fotos que les gusten y las comprarán online.",
    },
    {
      icon: Star,
      title: "Fotos populares",
      description:
        "Puedes crear cuentas con descuentos especiales para tus clientes que puedan utilizar al momento de pagar por sus fotos en línea.",
    },
  ]

  return (
    <section className="py-20 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-16 h-16 bg-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <feature.icon className="w-8 h-8 text-white" />
              </motion.div>
              <h3 className="text-xl font-bold mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
