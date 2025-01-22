import React, { Suspense, lazy } from "react";
import { API_URL, ATTENDANCE } from "@/lib/apiEndPoints";
import { getUserDetails } from "@/lib/getUserDetails";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableSkeleton } from "@/components/base/tableComponents/tableSkeleton";
import { Metadata } from "next";
import { DateRangePicker } from "@/components/date-range-picker (1)";
import { complaintsMeta } from "@/lib/Meta";

const DataFetcher = lazy(() => import("./components/DataFetcher"));

interface SearchParams {
  [key: string]: string | undefined;
}

interface UserProps {
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: `${complaintsMeta.title} | Tasker Company`,
  description: complaintsMeta.description,
};

const ComplaintsPage: React.FC<UserProps> = async ({ searchParams }) => {
  const user = await getUserDetails();
  const role = user?.userDetails?.role || "user";

  const pageEndPoint = `${API_URL}${ATTENDANCE}`;
  const queryString = Object.entries(searchParams)
    .filter(([_, value]) => value !== undefined && value !== "")
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value!)}`,
    )
    .join("&");

  const endPoint = `${pageEndPoint}?${queryString}`;

  return (
    <>
      <Suspense
        fallback={
          <>
            <div className="mb-2 rounded">
              <Skeleton className="h-16 w-full" />
            </div>
            <DataTableSkeleton
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
            />
          </>
        }
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg">{complaintsMeta.title}</h2>
            <p className="hidden text-xs text-gray-500 sm:block">
              {complaintsMeta.description}
            </p>
          </div>
          {/* <DateRangePicker /> */}
        </div>
        <DataFetcher
          endPoint={endPoint}
          pageEndPoint={pageEndPoint}
          role={role}
        />
      </Suspense>
    </>
  );
};

export default ComplaintsPage;
