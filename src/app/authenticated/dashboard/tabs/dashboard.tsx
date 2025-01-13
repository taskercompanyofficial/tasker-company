import FirstChart from "@/components/dashboard/charts/FirstChart";
import SecondChart from "@/components/dashboard/charts/second-chart";
import React, { Suspense } from "react";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL, COMPLAINTS } from "@/lib/apiEndPoints";
import Table from "../../complaints/components/Table";
import { Skeleton } from "@/components/ui/skeleton";
import { LuServerCrash } from "react-icons/lu";
export default async function Dashboard({
  searchParams,
}: {
  searchParams: any;
}) {
  const complaintsByStatus = await fetchData({
    endPoint: `${API_URL}/get/complaintByStatus`,
  });
  

  return (
    <div className="space-y-4">
      <FirstChart data={complaintsByStatus?.data} />
      <SecondChart data={complaintsByStatus?.data} />
  
    </div>
  );
}
