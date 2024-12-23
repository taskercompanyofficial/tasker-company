import React, { Suspense } from "react";
import { ActiveComplaintsChart } from "./ComplaintsChart";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL } from "@/lib/apiEndPoints";
import { Skeleton } from "@/components/ui/skeleton";

export default async function SecondChart() {
  const complaintsByStatus = await fetchData({
    endPoint: `${API_URL}/get/complaintByStatus`,
  });

  return (
    <div className="grid grid-cols-1 gap-2 md:grid-cols-2">
      <Suspense fallback={<Skeleton className="h-[200px] w-full" />}>
        <ActiveComplaintsChart
          chartData={complaintsByStatus?.data?.active_complaints}
        />
      </Suspense>
    </div>
  );
}
