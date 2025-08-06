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
        "FOTONUBE es una plataforma ecommerce diseñada especialmente para publicar, vender y cobrar en línea la venta de fotos. FOTONUBE es útil para fotógrafos aficionados o independientes, para equipos profesionales de fotógrafos o bien para grandes estudios de fotografía profesional.",
    },
    {
      question: "¿Cómo puedo usar FOTONUBE?",
      answer:
        "Para usar FOTONUBE sólo tienes que registrarte como usuario y ya puedes usar la plataforma en su versión Free, con un límite de 2GB de almacenamiento en la nube y puedes publicar hasta 1 álbum de fotos para comercializar.Tene en cuenta que en la versión FOTONUBE Free se cobra un 4,99% de comisión por transacción.",
    },
    {
      question: "¿Qué necesito para empezar a usar FOTONUBE?",
      answer:
        "Sólo necesitas un correo electrónico para registrarte y establecer una contraseña, para suscribir a FOTONUBE Free. Luego puedes ingresar a tu panel de control y crear tu primer álbum de fotos.",
    },
    {
      question: "FOTONUBE - ¿tiene costo?",
      answer:
        "FOTONUBE, cuenta con una versión Free que es de uso gratuito, brinda 2 GB de espacio en la nube, para alojar fotos, y la posibilidad de publicar hasta 1 álbum para comercializar, en esta versión se cobra un 4,99% de comisión por transacción. También contamos con la versión FOTONUBE Pro, que es de pago y ofrece 30 GB de espacio en la nube y publicación ilimitadas de álbumes, en esta versión se cobra un 1,99% de comisión por transacción.",
    },
    {
      question: "¿Cómo acceden mis clientes a los álbumes?",
      answer:
        "Tus clientes acceden a los álbumes a través de links específicos de cada álbum que el sistema genera automáticamente, además tus clientes pueden compartir estos links con familiares y amigos.",
    },
    {
      question: "¿Cómo controlo el servicio de FOTONUBE?",
      answer:
        "Debes registrarte como fotógrafo o comprador de fotos, con tu correo electrónico más una contraseña, y ¡listo! ya puedes usar la versión FOTONUBE Free. Luego, si la herramienta te fue útil, puedes suscribir a la versión FOTONUBE pro (de pago).",
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedFaq(expandedFaq === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50" id="faqs">
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
