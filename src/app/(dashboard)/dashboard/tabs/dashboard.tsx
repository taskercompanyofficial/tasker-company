import FirstChart from "@/components/dashboard/charts/FirstChart";
import SecondChart from "@/components/dashboard/charts/second-chart";
import React from "react";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL, COMPLAINTS } from "@/lib/apiEndPoints";
import Table from "../../complaints/components/Table";
export default async function Dashboard({
  searchParams,
}: {
  searchParams: any;
}) {
  const complaintsByStatus = await fetchData({
    endPoint: `${API_URL}/get/complaintByStatus`,
  });
  const pageEndPoint = `${API_URL}${COMPLAINTS}`;
  const response = await fetchData({
    endPoint: `${API_URL}/complaints`,
  });

  return (
    <div className="space-y-4">
      <FirstChart data={complaintsByStatus?.data} />
      <SecondChart data={complaintsByStatus?.data} />
      <Table data={response.data} endPoint={pageEndPoint} />
    </div>
  );
}
