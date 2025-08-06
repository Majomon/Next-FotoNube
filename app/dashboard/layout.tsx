import DashboardNavbar from "@/components/dashboard/ui/DashboardNavbar ";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div>
      <DashboardNavbar />
      <main className="pt-32 px-6">{children}</main>
    </div>
  );
}
