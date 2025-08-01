"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Camera } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAppStore } from "@/store/store";
import Link from "next/link";

export default function Header() {
  const { isMenuOpen, setMenuOpen } = useAppStore();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    "SOBRE FOTONUBE",
    "PREGUNTAS FRECUENTES",
    "CONTACTO",
    "REGISTRARSE",
    "INICIAR SESIÓN",
  ];

  return (
    <div className="relative z-[9999]">
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 w-full transition-all duration-300 ${
          scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="flex items-center space-x-2"
            >
              <div className="w-8 h-8 bg-cyan-500 rounded-full flex items-center justify-center">
                <Camera className="w-5 h-5 text-white" />
              </div>
              <span
                className={`text-xl font-bold ${
                  scrolled ? "text-gray-900" : "text-white"
                }`}
              >
                FOTONUBE
              </span>
            </motion.div>

            {/* Desktop Menu */}
            <nav className="hidden md:flex items-center space-x-8">
              {menuItems.map((item) => {
                let href = "#";
                if (item === "INICIAR SESIÓN") href = "/login";
                else if (item === "REGISTRARSE") href = "/register";

                return (
                  <Link
                    key={item}
                    href={href}
                    className={`text-sm font-medium transition-colors ${
                      scrolled
                        ? "text-gray-700 hover:text-cyan-600"
                        : "text-white hover:text-cyan-300"
                    }`}
                  >
                    {item}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X
                  className={`w-6 h-6 ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                />
              ) : (
                <Menu
                  className={`w-6 h-6 ${
                    scrolled ? "text-gray-900" : "text-white"
                  }`}
                />
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
                {menuItems.map((item) => {
                  let href = "#";
                  if (item === "INICIAR SESIÓN") href = "/login";
                  else if (item === "REGISTRARSE") href = "/register";

                  return (
                    <Link
                      key={item}
                      href={href}
                      className={`block py-2 text-sm font-medium ${
                        scrolled ? "text-gray-700" : "text-white"
                      }`}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item}
                    </Link>
                  );
                })}
              </motion.nav>
            )}
          </AnimatePresence>
        </div>
      </motion.header>
    </div>
  );
}
