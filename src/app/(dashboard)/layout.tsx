import { Metadata } from "next";
import { getUserDetails } from "@/lib/getUserDetails";
import AdminPanelLayout from "@/components/admin-panel/admin-panel-layout";
import { ContentLayout } from "@/components/admin-panel/content-layout";

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
  return (
    <>
      <AdminPanelLayout role={user.userDetails?.role}>
        <ContentLayout user={user.userDetails}>{children} </ContentLayout>
      </AdminPanelLayout>
    </>
  );
}
