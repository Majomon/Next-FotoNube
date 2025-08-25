// components/dashboard/ui/DashboardSidebar.tsx
"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";

export default function DashboardSidebar() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  if (!user) {
    return (
      <aside className="min-h-screen w-2/12 bg-white border-r border-gray-200 flex-shrink-0 h-full px-6">
        <nav className="fixed top-2 flex flex-col px-4 space-y-4 pt-24">
          {/* Simula los links con divs */}
          {Array.from({ length: 5 }).map((_, idx) => (
            <div
              key={idx}
              className="h-6 w-32 bg-gray-200 rounded-md animate-pulse"
            />
          ))}
        </nav>
      </aside>
    );
  }

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
    <aside className="min-h-screen w-2/12 bg-white border-r border-gray-200 flex-shrink-0 h-full px-6">
      <nav className="fixed top-2 flex flex-col px-4 space-y-6 pt-24">
        {linksToShow.map((link) => {
          const isActive = pathname === link.href;

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`font-medium ${
                isActive
                  ? "text-cyan-600 border-l-4 border-cyan-600 pl-2"
                  : "text-gray-700 hover:text-cyan-600"
              }`}
            >
              {link.text}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
