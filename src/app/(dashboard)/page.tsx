import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { dashboardMeta } from "@/lib/Meta";
import { getUserDetails } from "@/lib/getUserDetails";
import Analytics from "./dashboard/tabs/analytics";
import Notifications from "./dashboard/tabs/notifications";
import Reports from "./dashboard/tabs/reports";
import Dashboard from "./dashboard/tabs/dashboard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: dashboardMeta.title,
  description: dashboardMeta.description,
};
export default async function DashboardPage() {
  const user = await getUserDetails();
  const userRole = user?.userDetails?.role;
  return (
    <div className="space-y-4">
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
          <Dashboard />
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
