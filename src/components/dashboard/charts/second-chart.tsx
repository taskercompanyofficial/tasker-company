import React from "react";
import { ActiveComplaintsChart } from "./ComplaintsChart";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL } from "@/lib/apiEndPoints";

export default async function SecondChart() {
  const complaintsByStatus = await fetchData({
    endPoint: `${API_URL}/get/complaintByStatus`,
  });

  // Prepare chart-friendly data for active and today's complaints
  const activeComplaints = complaintsByStatus?.data?.active_complaints || [];
  const todayComplaints = complaintsByStatus?.data?.today_complaints || [];

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-3">
      {/* Active Complaints Chart */}
      <div className="col-span-2">
        <ActiveComplaintsChart chartData={activeComplaints} />
      </div>
    </div>
  );
}
