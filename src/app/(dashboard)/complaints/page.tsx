import { getUserDetails } from "@/lib/getUserDetails";
import React, { Suspense, lazy } from "react";
import { Metadata } from "next";
import { complaintsMeta } from "@/lib/Meta";
import { API_URL, CATEGORIES } from "@/lib/apiEndPoints";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableSkeleton } from "@/components/base/tableComponents/tableSkeleton";
import { DateRangePicker } from "@/components/date-range-picker (1)";

const DataFetcher = lazy(() => import("./components/DataFetcher"));

interface SearchParams {
  [key: string]: string | undefined;
}

interface UserProps {
  searchParams: SearchParams;
  included?: boolean;
}

export const metadata: Metadata = {
  title: `${complaintsMeta.title} | Tasker Company`,
  description: complaintsMeta.description,
};

export default async function ComplaintsPage({
  searchParams,
  included,
}: UserProps) {
  const user = await getUserDetails();
  const role = user?.userDetails?.role || "user";

  const pageEndPoint = `${API_URL}${CATEGORIES}`;
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
        {!included && (
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg">{complaintsMeta.title}</h2>
              <p className="hidden text-sm text-gray-500 sm:block">
                {complaintsMeta.description}
              </p>
            </div>
            <DateRangePicker />
          </div>
        )}
        <DataFetcher
          endPoint={endPoint}
          pageEndPoint={pageEndPoint}
          role={role}
          included={included}
        />
      </Suspense>
    </>
  );
}
