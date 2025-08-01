"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useAppStore } from "@/store/store";

export default function FAQSection() {
  const { expandedFaq, setExpandedFaq } = useAppStore();

  const faqs = [
    {
      question: "¿Qué es FOTONUBE?",
      answer:
        "FOTONUBE es una plataforma online diseñada especialmente para publicar, vender y distribuir fotos de eventos de manera rápida y sencilla. Permite a los fotógrafos profesionales de fotografía en línea para generar ingresos de fotografía profesional.",
    },
    {
      question: "¿Cómo puedo usar FOTONUBE?",
      answer:
        "Solo necesitas un correo electrónico para crear una cuenta gratuita y subir tus fotos de eventos en tu cuenta FOTONUBE. Puedes crear álbumes de fotos, configurar precios y comenzar a vender inmediatamente.",
    },
    {
      question: "¿Qué necesito para empezar a usar FOTONUBE?",
      answer:
        "Solo necesitas un correo electrónico para crear una cuenta gratuita y subir tus fotos de eventos. La plataforma es muy intuitiva y fácil de usar, no necesitas conocimientos técnicos avanzados.",
    },
    {
      question: "FOTONUBE - ¿tiene costo?",
      answer:
        "FOTONUBE ofrece un plan gratuito para comenzar. Tenemos diferentes planes de suscripción con características adicionales. Puedes comenzar gratis y actualizar cuando necesites más funcionalidades.",
    },
    {
      question: "¿Cómo acceden mis clientes a los álbumes?",
      answer:
        "Tus clientes acceden a diferentes álbumes de fotos mediante links únicos que puedes compartir. También pueden encontrar los álbumes mediante búsquedas en línea, ya que están optimizados para motores de búsqueda.",
    },
    {
      question: "¿Cómo controlo el servicio de FOTONUBE?",
      answer:
        "Desde tu panel de control puedes gestionar todos tus álbumes, ver estadísticas de ventas, configurar precios, gestionar clientes y mucho más. Tienes control total sobre tu contenido y ventas.",
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            PREGUNTAS FRECUENTES
          </h2>
          <p className="text-lg text-gray-600">
            Encuentra aquí las respuestas a las preguntas más comunes sobre
            nuestro servicio de venta y distribución de fotos en línea.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-lg shadow-md overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-gray-900">
                  {faq.question}
                </h3>
                <motion.div
                  animate={{ rotate: expandedFaq === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronDown className="w-5 h-5 text-gray-500" />
                </motion.div>
              </button>

              <AnimatePresence>
                {expandedFaq === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-4">
                      <p className="text-gray-600 leading-relaxed">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
