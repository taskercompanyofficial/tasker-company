import { Metadata } from "next";
import { getUserDetails } from "@/lib/getUserDetails";
import { AppSidebar } from "@/components/app-sidebar";
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar";
import Navbar from "@/components/admin-panel/navbar";
export const metadata: Metadata = {
  title: "Dashboard | LogicPulse",
  description: "An Evesome platform",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const user = await getUserDetails();
  const role = user.userDetails?.role || "user";
  return (
    <SidebarProvider>
      <AppSidebar role={role} />
      <SidebarInset className="overflow-hidden">
        <Navbar user={user.userDetails} />
        <main className="min-h-screen bg-gray-50 p-4 dark:bg-gray-900">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
