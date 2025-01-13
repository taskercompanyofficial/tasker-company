import React, { Suspense } from "react";
import ChartsByStatus from "./charts-by-status";
import { fetchData } from "@/app/dataFetch/fetchData";
import { API_URL, COMPLAINTS } from "@/lib/apiEndPoints";
import OtherStatusComplaints from "./other-status-complaints";
import { DataTableSkeleton } from "@/components/base/tableComponents/tableSkeleton";
import { LuServerCrash } from "react-icons/lu";
import Table from "@/app/authenticated/complaints/components/Table";

export default async function OverviewTab() {
  const complaintStatusData = await fetchData({
    endPoint: API_URL + "/crm/dashboard-chart-data",
  });
  const complaintStatusForBar = await fetchData({
    endPoint: API_URL + "/crm/dashboard-status-data",
  });
  const EndPoint = `${API_URL}${COMPLAINTS}`;
  const response = await fetchData({
    endPoint: EndPoint,
  });
  return (
    <div className="space-y-8 antialiased">
      <ChartsByStatus complaintStatusData={complaintStatusData.data} />
      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2">
          <OtherStatusComplaints data={complaintStatusForBar.data} />
        </div>
      </div>
      <Suspense fallback={<DataTableSkeleton
        columnCount={7}
        searchableColumnCount={1}
        filterableColumnCount={2}
        cellWidths={[
          "4rem",
          "10rem",
          "40rem",
          "12rem",
          "12rem",
          "8rem",
          "3rem",
        ]}
        shrinkZero
      />}>
        {response.data.data ? (
          <Table data={response.data} endPoint={EndPoint} />
        ) : (
          <div className="flex min-h-72 w-full flex-col items-center justify-center rounded border border-gray-200 bg-white px-2 py-4 text-gray-100 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-600">
            <div className="text-[70px]">
              <LuServerCrash />
            </div>
            <div>Something went wrong please try to refresh the page.</div>
          </div>
        )}
      </Suspense>
    </div>
  );
}
