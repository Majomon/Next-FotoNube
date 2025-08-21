// components/dashboard/ui/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardSidebar() {
  const { user } = useAuthStore();
  if (!user) return null;

  const photographerLinks = [
    { href: "/dashboard/newalbum", text: "Nuevo Álbum" },
    { href: "/dashboard/uploadphotos", text: "Subir Fotos" },
    { href: "/dashboard/albums", text: "Álbumes" },
    { href: "/dashboard/orders", text: "Pedidos" },
    { href: "/dashboard/subscription", text: "Suscripción" },
  ];

  const buyerLinks = [
    { href: "/dashboard/ver-album", text: "Ver Álbum" },
    { href: "/dashboard/como-comprar", text: "Cómo Comprar" },
    { href: "/dashboard/medios-de-pago", text: "Medios de Pago" },
    { href: "/dashboard/contacto", text: "Contacto" },
  ];

  const linksToShow =
    user.role === "photographer" ? photographerLinks : buyerLinks;

  return (
    <aside className="fixed top-0 min-h-screen w-60 bg-white border-r border-gray-200 flex-shrink-0 h-full">
      <nav className="flex flex-col px-4 space-y-6 pt-24">
        {linksToShow.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="text-gray-700 hover:text-cyan-600 font-medium"
          >
            {link.text}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
