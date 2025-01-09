import React from "react";
import ChartsByStatus from "./charts-by-status";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL } from "@/lib/apiEndPoints";

export default async function OverviewTab() {
  const complaintStatusData = await fetchData({
    endPoint: API_URL + "/crm/dashboard-chart-data",
  });
  return (
    <div className="space-y-8 antialiased">
      <ChartsByStatus complaintStatusData={complaintStatusData.data} />
    </div>
  );
}
