"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import {
  Cloud,
  Home,
  PlusSquare,
  Folder,
  ShoppingCart,
  CreditCard,
  Key,
  FolderOpen,
  HelpCircle,
} from "lucide-react";

export default function DashboardSidebar() {
  const { user } = useAuthStore();
  const pathname = usePathname();

  if (!user) {
    return (
      <aside className="min-h-screen w-2/12 bg-white border-r border-gray-200 flex-shrink-0 h-full px-6">
        <nav className="fixed top-2 flex flex-col px-4 space-y-4 pt-24">
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
    { href: "/dashboard/newalbum", text: "Nuevo Álbum", icon: PlusSquare },
    { href: "/dashboard/albums", text: "Álbumes", icon: Folder },
    { href: "/dashboard/orders", text: "Pedidos", icon: ShoppingCart },
    { href: "/dashboard/subscription", text: "Suscripción", icon: CreditCard },
  ];

  const buyerLinks = [
    { href: "/dashboard/ingresar-album", text: "Acceder a Álbum", icon: Key },
    { href: "/dashboard/ver-album", text: "Mis Álbumes", icon: FolderOpen },
    { href: "/dashboard/como-comprar", text: "Cómo Comprar", icon: HelpCircle },
    { href: "/dashboard/pedidos", text: "Mis Compras", icon: ShoppingCart },
  ];

  const linksToShow =
    user.role === "photographer" ? photographerLinks : buyerLinks;

  const paymentMethods = [
    { name: "MercadoPago", logo: "/payments/mercadopago.png" },
    { name: "Tarjeta de Crédito", logo: "/payments/credit-card.png" },
    { name: "Transferencia", logo: "/payments/transfer.png" },
    { name: "Paypal", logo: "/payments/paypal.png" },
  ];

  return (
    <aside className="min-h-screen w-2/12 flex flex-col justify-between pb-16 bg-white border-r border-gray-200 flex-shrink-0 h-full px-6">
      <nav className="flex flex-col px-4 space-y-6 pt-24">
        {linksToShow.map((link) => {
          const isActive = pathname === link.href;
          const Icon = link.icon;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 font-medium ${
                isActive
                  ? "text-cyan-600 border-l-4 border-cyan-600 pl-2"
                  : "text-gray-500 hover:text-cyan-600"
              }`}
            >
              <Icon size={20} />
              {link.text}
            </Link>
          );
        })}
      </nav>

      {/* Logo + Ícono animado abajo */}
      <div className="flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="mb-4 flex justify-center"
        >
          <Cloud size={40} className="text-cyan-600" />
        </motion.div>

        <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl shadow-md text-center text-white text-sm font-semibold">
          FotoNube
        </div>
      </div>
    </aside>
  );
}
