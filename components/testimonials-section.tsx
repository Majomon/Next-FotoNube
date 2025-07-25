"use client"

import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useAppStore } from "@/lib/store"
import Image from "next/image"
import { useEffect, useState } from "react"

export default function TestimonialsSection() {
  const { activeTestimonial, setActiveTestimonial } = useAppStore()
  const [itemsPerView, setItemsPerView] = useState(3)

  const testimonials = [
    {
      name: "Martín Rodriguez",
      role: "Fotógrafo de Bodas",
      avatar:
        "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      text: "Con FOTONUBE tengo álbumes de mis exposiciones que subo y los dejo a la venta al usuario y comprando, desde mi página de portafolio, entonces me sube mucho las ventas que son bastante buenas en mis existencias.",
      rating: 5,
    },
    {
      name: "Ana García",
      role: "Fotógrafa de Eventos",
      avatar:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      text: "FOTONUBE ha revolucionado mi negocio de fotografía de eventos. Ahora puedo vender mis fotos directamente a los clientes sin intermediarios, y las ventas han aumentado significativamente.",
      rating: 5,
    },
    {
      name: "Carlos Ruiz",
      role: "Fotógrafo Deportivo",
      avatar:
        "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      text: "La plataforma es muy fácil de usar y mis clientes pueden encontrar y comprar sus fotos rápidamente. El sistema de pagos es seguro y confiable. Totalmente recomendado.",
      rating: 5,
    },
    {
      name: "María López",
      role: "Fotógrafa Social",
      avatar:
        "https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      text: "Desde que uso FOTONUBE, mis clientes pueden acceder a sus fotos desde cualquier dispositivo. La experiencia de usuario es excelente y las ventas han crecido un 200%.",
      rating: 5,
    },
    {
      name: "Diego Fernández",
      role: "Fotógrafo Corporativo",
      avatar:
        "https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2",
      text: "La mejor inversión que he hecho para mi negocio. FOTONUBE me permite gestionar todos mis álbumes de manera profesional y mis clientes están muy satisfechos.",
      rating: 5,
    },
  ]

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3)
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2)
      } else {
        setItemsPerView(1)
      }
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const maxIndex = Math.max(0, testimonials.length - itemsPerView)

  const nextTestimonial = () => {
    setActiveTestimonial(activeTestimonial >= maxIndex ? 0 : activeTestimonial + 1)
  }

  const prevTestimonial = () => {
    setActiveTestimonial(activeTestimonial <= 0 ? maxIndex : activeTestimonial - 1)
  }

  const getVisibleTestimonials = () => {
    const visible = []
    for (let i = 0; i < itemsPerView; i++) {
      const index = (activeTestimonial + i) % testimonials.length
      visible.push({ ...testimonials[index], originalIndex: index })
    }
    return visible
  }

  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-gray-900 mb-4">TESTIMONIOS</h2>
          <p className="text-lg text-gray-600">Lo que dicen nuestros fotógrafos sobre FOTONUBE</p>
        </motion.div>

        <div className="relative max-w-7xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="ghost"
            size="sm"
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 border"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 w-12 h-12 rounded-full bg-white shadow-lg hover:bg-gray-50 border"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>

          {/* Cards Container */}
          <div className="overflow-hidden mx-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5 }}
                className={`grid gap-6 ${
                  itemsPerView === 3 ? "grid-cols-3" : itemsPerView === 2 ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {getVisibleTestimonials().map((testimonial, index) => (
                  <motion.div
                    key={`${testimonial.originalIndex}-${activeTestimonial}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 shadow-lg">
                      <CardContent className="p-6 text-center space-y-4">
                        {/* Avatar */}
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          className="w-20 h-20 mx-auto rounded-full overflow-hidden ring-4 ring-cyan-100"
                        >
                          <Image
                            src={testimonial.avatar || "/placeholder.svg"}
                            alt={testimonial.name}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                          />
                        </motion.div>

                        {/* Stars */}
                        <div className="flex justify-center space-x-1">
                          {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        {/* Testimonial Text */}
                        <p className="text-gray-600 leading-relaxed text-sm italic">"{testimonial.text}"</p>

                        {/* Name and Role */}
                        <div>
                          <h3 className="text-lg font-bold text-gray-900">{testimonial.name}</h3>
                          <p className="text-sm text-cyan-600 font-medium">{testimonial.role}</p>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center space-x-2 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === activeTestimonial ? "bg-cyan-500 scale-125" : "bg-gray-300 hover:bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
