import React from "react";
import ChartsByStatus from "./charts-by-status";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL } from "@/lib/apiEndPoints";
import OtherStatusComplaints from "./other-status-complaints";

export default async function OverviewTab() {
  const complaintStatusData = await fetchData({
    endPoint: API_URL + "/crm/dashboard-chart-data",
  });
  const complaintStatusForBar = await fetchData({
    endPoint: API_URL + "/crm/dashboard-status-data",
  });
  return (
    <div className="space-y-8 antialiased">
      <ChartsByStatus complaintStatusData={complaintStatusData.data} />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <OtherStatusComplaints data={complaintStatusForBar.data} />
        </div>
      </div>
    </div>
  );
}
