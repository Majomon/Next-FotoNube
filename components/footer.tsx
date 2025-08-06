"use client";

import { motion } from "framer-motion";
import {
  Camera,
  Facebook,
  Instagram,
  Youtube,
  Mail,
  MapPin,
} from "lucide-react";

export default function Footer() {
  const navigationLinks = [
    "Inicio",
    "Sobre FOTONUBE",
    "Preguntas Frecuentes",
    "Contacto",
  ];

  const contactInfo = [
    { icon: Mail, text: "hola@fotonube.com" },
    { icon: MapPin, text: "Buenos Aires, Argentina" },
  ];

  const socialLinks = [
    { icon: Facebook, href: "https://www.facebook.com/FOTONUBE" },
    { icon: Youtube, href: "https://www.youtube.com/@fotonubeARG" },
    { icon: Instagram, href: "https://www.instagram.com/fotonubeok" },
  ];

  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">FOTONUBE</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              FOTONUBE es una plataforma ecommerce diseñada especialmente para
              publicar, vender y cobrar en línea la venta de fotos. FOTONUBE es
              útil para fotógrafos aficionados o independientes, para equipos
              profesionales de fotógrafos o bien para grandes estudios de
              fotografía profesional.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">NAVEGAR</h3>
            <ul className="space-y-2">
              {navigationLinks.map((link, index) => (
                <li key={index}>
                  <motion.a
                    href="#"
                    whileHover={{ x: 5 }}
                    className="text-gray-400 hover:text-white transition-colors text-sm"
                  >
                    {link}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">CONTACTANOS</h3>
            <ul className="space-y-3">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-center space-x-3">
                  <item.icon className="w-4 h-4 text-cyan-500" />
                  <span className="text-gray-400 text-sm">{item.text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Newsletter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="text-lg font-semibold mb-4">SÍGUENOS</h3>
            <p className="text-gray-400 text-sm mb-4">
              Mantente al día con las últimas actualizaciones y consejos para
              fotógrafos.
            </p>
            <div className="flex space-x-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-cyan-500 transition-colors"
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-gray-800 mt-12 pt-8 text-center"
        >
          <p className="text-gray-400 text-sm">
            © Copyright FOTONUBE. All Rights Reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
