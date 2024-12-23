import React, { Suspense } from "react";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { IoCloseCircleOutline, IoCodeWorkingOutline } from "react-icons/io5";
import { MdOutlineReportProblem } from "react-icons/md";
import { ClipboardList } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// Define types for the status configuration
type StatusConfigType = {
  [key: string]: { icon: JSX.Element; description: string };
};

type ComplaintData = {
  status: string;
  count: number;
};

const statusConfig: StatusConfigType = {
  open: {
    icon: <IoCodeWorkingOutline className="h-4 w-4" />,
    description: "Complaints currently open and unresolved.",
  },
  closed: {
    icon: <IoCloseCircleOutline className="h-4 w-4" />,
    description: "Complaints resolved and closed.",
  },
  cancelled: {
    icon: <MdOutlineReportProblem className="h-4 w-4" />,
    description: "Complaints canceled by users or admins.",
  },
  total: {
    icon: <ClipboardList className="h-4 w-4" />,
    description: "Total complaints created or updated in the range.",
  },
};

// Skeleton loader component

// Chart component
function ComplaintsChart({
  complaintsInRange,
}: {
  complaintsInRange: ComplaintData[];
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {complaintsInRange.map((item) => (
        <Card key={item.status}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              {item.status.charAt(0).toUpperCase() + item.status.slice(1)}{" "}
              Complaints
            </CardTitle>
            {statusConfig[item.status]?.icon || null}
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{item.count}</div>
            <p className="text-xs text-muted-foreground">
              {statusConfig[item.status]?.description ||
                "No description available."}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Wrapper component using Suspense
export default function FirstChart({ data }: { data: any }) {
  return (
    <Suspense
      fallback={
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
          <Skeleton className="h-[200px] w-full" />
        </div>
      }
    >
      <ComplaintsChart complaintsInRange={data.complaints_in_range || []} />
    </Suspense>
  );
}
