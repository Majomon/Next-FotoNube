"use client";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardHome() {
  const { logout, user } = useAuthStore();

  if (!user) return null;

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Bienvenido al panel</h1>
      <p>Usuario: {user.email}</p>
      <p>Rol: {user.role}</p>
    </div>
  );
}
