import React, { Suspense, lazy } from "react";
import { API_URL, CATEGORIES } from "@/lib/apiEndPoints";
import { getUserDetails } from "@/lib/getUserDetails";
import { FaLock } from "react-icons/fa";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import { DataTableSkeleton } from "@/components/base/tableComponents/tableSkeleton";
import { Metadata } from "next";
import { DateRangePicker } from "@/components/date-range-picker (1)";
import { categoreisMeta } from "@/lib/Meta";

const DataFetcher = lazy(() => import("./components/DataFetcher"));

interface SearchParams {
  [key: string]: string | undefined;
}

interface UserProps {
  searchParams: SearchParams;
}

export const metadata: Metadata = {
  title: `${categoreisMeta.title} | Tasker Company`,
  description: categoreisMeta.description,
};

const page: React.FC<UserProps> = async ({ searchParams }) => {
  const user = await getUserDetails();
  const role = user?.userDetails?.role || "user";

  if (role !== "administrator") {
    return (
      <div className="flex min-h-72 w-full flex-col items-center justify-center rounded border border-gray-200 bg-white px-2 py-4 text-gray-100 shadow-sm dark:border-gray-700 dark:bg-gray-900 dark:text-gray-600">
        <div className="text-[70px]">
          <FaLock />
        </div>
        <h2 className="text-lg">You do not have access to this page.</h2>
        <p>
          Please click here to go back
          <Link href="/" className="text-blue-600">
            Home
          </Link>
        </p>
      </div>
    );
  }

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
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg">{categoreisMeta.title}</h2>
            <p className="hidden text-sm text-gray-500 sm:block">
              {categoreisMeta.description}
            </p>
          </div>
          <DateRangePicker />
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

export default page;
