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
  const EndPoint = `${API_URL}${COMPLAINTS}`;
  const response = await fetchData({
    endPoint: EndPoint,
  });

  return (
    <div className="space-y-4">
      <FirstChart data={complaintsByStatus?.data} />
      <SecondChart data={complaintsByStatus?.data} />
      <Suspense fallback={<Skeleton className="h-48 w-full" />}>
        {response.data ? (
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
