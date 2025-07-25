"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  const slides = [
    {
      id: 1,
      title: "¡Organiza fácilmente tu trabajo diario con FOTONUBE!",
      subtitle:
        "Crea múltiples usuarios de Tu FOTONUBE para que puedas delegar la gestión y administración de tus álbumes online. Puedes listar los pedidos de un evento para organizar la producción y entrega de las fotos.",
      image: "/hero-slide-1.png",
      cta: "DESCUBRE FOTONUBE",
    },
    {
      id: 2,
      title: "Con FOTONUBE puedes publicar fácilmente las fotos de los eventos que cubres.",
      subtitle:
        "Puedes publicar álbumes de fotos de los eventos deportivos, corporativos o sociales que cubras para mostrarlas y venderlas fácilmente en línea.",
      image: "/hero-slide-2.png",
      cta: "DESCUBRE FOTONUBE",
    },
    {
      id: 3,
      title: "Publica en FOTONUBE las fotos escolares",
      subtitle:
        "El sobre para cobrar las fotos del colegio ¡No va más! tus clientes pagan sus pedidos de fotos online, a través de FOTONUBE.",
      image: "/hero-slide-3.png",
      cta: "DESCUBRE FOTONUBE",
    },
    {
      id: 4,
      title: "¡Con FOTONUBE puedes mostrar y vender tus fotos en línea!",
      subtitle:
        "No importa si eres un fotógrafo aficionado, si formas parte de un equipo profesional de fotógrafos o tienes un gran estudio de fotografía profesional.",
      image: "/hero-slide-4.png",
      cta: "DESCUBRE FOTONUBE",
    },
  ]

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying, slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
    setIsAutoPlaying(false)
  }

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Images */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[currentSlide].image || "/placeholder.svg"}
            alt={`Slide ${currentSlide + 1}`}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/50" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronLeft className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 z-30 w-12 h-12 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center backdrop-blur-sm transition-all duration-300 group"
        onMouseEnter={() => setIsAutoPlaying(false)}
        onMouseLeave={() => setIsAutoPlaying(true)}
      >
        <ChevronRight className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
      </button>

      {/* Content */}
      <div className="relative z-20 text-center text-white max-w-5xl mx-auto px-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-6"
          >
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight">
              {slides[currentSlide].title.includes("FOTONUBE") ? (
                <>
                  {slides[currentSlide].title.split("FOTONUBE")[0]}
                  <span className="text-cyan-400">FOTONUBE</span>
                  {slides[currentSlide].title.split("FOTONUBE")[1]}
                </>
              ) : (
                slides[currentSlide].title
              )}
            </h1>

            <p className="text-lg md:text-xl max-w-4xl mx-auto leading-relaxed">{slides[currentSlide].subtitle}</p>

            <div className="pt-4">
              <p className="text-sm uppercase tracking-wider mb-6 opacity-90">GRATIS POR</p>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  {slides[currentSlide].cta}
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? "bg-cyan-400 scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
            onMouseEnter={() => setIsAutoPlaying(false)}
            onMouseLeave={() => setIsAutoPlaying(true)}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-black/20 z-30">
        <motion.div
          key={currentSlide}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-cyan-400"
          style={{ display: isAutoPlaying ? "block" : "none" }}
        />
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-16 left-1/2 transform -translate-x-1/2 z-20"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="w-6 h-10 border-2 border-white/70 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            className="w-1 h-3 bg-white/70 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}
