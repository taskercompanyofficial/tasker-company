import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardMeta } from "@/lib/Meta";
import { getUserDetails } from "@/lib/getUserDetails";
import Analytics from "./dashboard/tabs/analytics";
import Notifications from "./dashboard/tabs/notifications";
import Reports from "./dashboard/tabs/reports";
import Dashboard from "./dashboard/tabs/dashboard";
import { Metadata } from "next";
import Accouncment from "@/components/dashboard/Accouncment";

export const metadata: Metadata = {
  title: dashboardMeta.title,
  description: dashboardMeta.description,
};
export default async function DashboardPage({
  searchParams,
}: {
  searchParams: any;
}) {
  const user = await getUserDetails();
  const userRole = user?.userDetails?.role;
  return (
    <div className="space-y-4">
      
      <Accouncment username={user?.userDetails?.name} />
      <Tabs defaultValue="dashboard">
        <TabsList>
          <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          <TabsTrigger
            value="analytics"
            disabled={userRole !== "administrator" && userRole !== "accountant"}
          >
            Analytics
          </TabsTrigger>
          <TabsTrigger value="reports" disabled={userRole !== "administrator"}>
            Reports
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            disabled={userRole !== "administrator"}
          >
            Notifications
          </TabsTrigger>
        </TabsList>
        <TabsContent value="dashboard" className="space-y-4">
          <Dashboard searchParams={searchParams} />
        </TabsContent>
        <TabsContent value="analytics" className="space-y-4">
          <Analytics />
        </TabsContent>
        <TabsContent value="reports" className="space-y-4">
          <Reports />
        </TabsContent>
        <TabsContent value="notifications" className="space-y-4">
          <Notifications />
        </TabsContent>
      </Tabs>
    </div>
  );
}
