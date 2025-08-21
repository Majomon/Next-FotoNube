// components/dashboard/ui/DashboardHeader.tsx
"use client";

import { LogOut, Settings } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardHeader() {
  const { logout, user, status } = useAuthStore();
  const router = useRouter();

  /*   if (!user) return null; */

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) {
    return (
      <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50">
        <div className="container mx-auto flex items-center justify-between px-6 py-3">
          {/* Logo skeleton */}
          <div className="flex items-center space-x-2">
            <div className="w-9 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-24 h-6 bg-gray-200 rounded animate-pulse" />
          </div>

          {/* Perfil + logout skeleton */}
          <div className="flex items-center space-x-4">
            <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse" />
            <div className="w-32 h-8 bg-gray-200 rounded animate-pulse" />
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 cursor-pointer">
          <img
            src="/logoTop.png"
            alt="Logo Fotonube"
            className="w-9 h-8 rounded-full"
          />
          <span className="text-xl font-bold text-gray-900">FOTONUBE</span>
        </Link>

        {/* Perfil + Logout */}
        <div className="flex items-center space-x-4">
          <Link href="/profile" className="p-2 rounded-full hover:bg-gray-100">
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
      </div>
    </header>
  );
}
