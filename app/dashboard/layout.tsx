import DashboardHeader from "@/components/dashboard/DashboardHeader/DashboardHeader";
import DashboardSidebar from "@/components/dashboard/Sidebar/Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="flex flex-col h-screen">
      {/* Header siempre arriba */}
      <DashboardHeader />

      {/* Contenedor principal: sidebar a la izquierda, contenido a la derecha */}
      <div className="flex flex-1">
        {/* Sidebar fijo a la izquierda */}
        <DashboardSidebar />

        {/* Contenido principal */}
        <main className="flex-1 p-6 overflow-auto bg-gray-50 pt-24">
          {children}
        </main>
      </div>
    </div>
  );
}
