"use client";

import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/store";
import { useAuthStore } from "@/store/useAuthStore";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import Link from "next/link";

export default function Header() {
  const { isMenuOpen, setMenuOpen } = useAppStore();
  const { user } = useAuthStore();

  const isLoggedIn = !!user;

  const menuItems = [
    { text: "Sobre FOTONUBE", href: "#descubre-fotonube" },
    { text: "Preguntas Frecuentes", href: "#faqs" },
    { text: "Contacto", href: "#footer" },
    ...(!isLoggedIn
      ? [
          { text: "Registrarse", href: "/register" },
          { text: "Iniciar Sesión", href: "/login" },
        ]
      : []),
    ...(isLoggedIn
      ? [{ text: "Mi FOTONUBE", href: "/dashboard", special: true }]
      : []),
  ];

  return (
    <div className="relative z-[9999]">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 w-full transition-all duration-300 bg-white/95 backdrop-blur-md shadow-lg"
      >
        <div className="container mx-auto px-4 py-1">
          <div className="flex items-center justify-between cursor-pointer">
            <Link href="/">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="flex items-center space-x-2"
              >
                <img
                  src="/logoTop.png"
                  alt="Logo Fotonube"
                  className="w-full h-full rounded-full"
                />
                <span className="text-xl font-bold text-gray-900">
                  FOTONUBE
                </span>
              </motion.div>
            </Link>

            {/* Desktop Menu */}
            <nav className="hidden md:flex">
              <ul className="flex items-center space-x-6">
                {menuItems.map((link) => (
                  <motion.li
                    key={link.href}
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  >
                    <Link
                      href={link.href}
                      className={`md:text-xs lg:text-sm font-medium transition-colors 
                        ${
                          link.special
                            ? "bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-cyan-600"
                            : "text-gray-700 hover:text-cyan-600"
                        }`}
                    >
                      {link.text}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="lg"
              className="md:hidden"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="w-10 h-10 text-gray-900" />
              ) : (
                <Menu className="w-10 h-10 text-gray-900" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {isMenuOpen && (
              <motion.nav
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden mt-4 pb-4"
              >
                <ul className="space-y-2">
                  {menuItems.map((link) => (
                    <motion.li key={link.href} whileHover={{ x: 5 }}>
                      <Link
                        href={link.href}
                        className={`block py-2 text-sm font-medium 
                          ${
                            link.special
                              ? "bg-cyan-500 text-white px-4 py-2 rounded-full hover:bg-cyan-600"
                              : "text-gray-700"
                          }`}
                      >
                        {link.text}
                      </Link>
                    </motion.li>
                  ))}
                </ul>
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  );
}
