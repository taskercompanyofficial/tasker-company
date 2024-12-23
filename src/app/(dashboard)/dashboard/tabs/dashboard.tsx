import FirstChart from "@/components/dashboard/charts/FirstChart";
import SecondChart from "@/components/dashboard/charts/second-chart";
import React from "react";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL } from "@/lib/apiEndPoints";
import ComplaintsPage from "../../complaints/page";
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
      <ComplaintsPage searchParams={searchParams} included />
    </div>
  );
}
