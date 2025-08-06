"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function DashboardNavbar() {
  const { logout, user } = useAuthStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <header className="w-full flex items-center justify-between px-6 py-4 border-b shadow-sm bg-white">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-cyan-600 rounded-full" />
        <h1 className="text-xl font-bold text-gray-800">FOTONUBE</h1>
      </div>

      {/* Botones */}
      <div className="flex items-center space-x-4">
        <Link
          href="/profile"
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          title="Configuración"
        >
          <Settings className="w-5 h-5 text-gray-600" />
        </Link>

        <button
          onClick={handleLogout}
          className="flex items-center px-3 py-1.5 text-sm bg-gray-200 hover:bg-gray-300 rounded-md text-gray-800 transition-colors"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
