import React, { Suspense } from "react";
import { ActiveComplaintsChart } from "./ComplaintsChart";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL } from "@/lib/apiEndPoints";

export default async function SecondChart() {
  const complaintsByStatus = await fetchData({
    endPoint: `${API_URL}/get/complaintByStatus`,
  });

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <Suspense fallback={<div>Loading...</div>}>
        <ActiveComplaintsChart
          chartData={complaintsByStatus?.data?.active_complaints}
        />
      </Suspense>
    </div>
  );
}
