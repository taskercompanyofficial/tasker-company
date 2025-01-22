"use client";
import TableFacedFilter from "@/components/base/tableComponents/table-faced-filter";
import { DataTable } from "@/components/base/table";
import SelectInput from "@/components/base/tableComponents/filters/select-input";
import { ComplaintStatusOptions } from "@/lib/otpions";
import SearchInput from "@/components/base/tableComponents/filters/search-input";
import { ComplaintsColumns } from "@/TableColumns/complaints-columns";
import CreateComplaint from "../create/create";
import useFetch from "@/hooks/usefetch";
import { API_URL } from "@/lib/apiEndPoints";
import { dataTypeIds } from "@/types";
import Skeleton from "react-loading-skeleton";
import { AttendanceColumns } from "@/TableColumns/Attendance-columns";

export default function Table({
  endPoint,
  data,
}: {
  endPoint: string;
  data: any;
}) {
  const { data: brandsData, isLoading } = useFetch<dataTypeIds[]>(
    API_URL + "/crm/fetch-authorized-brands",
  );
  return (
    <DataTable
      data={data.data}
      endPoint={endPoint}
      columns={AttendanceColumns()}
      pagination={data.pagination}
      FacedFilter={
        <TableFacedFilter>
          <SearchInput />
          {isLoading ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <SelectInput
              param="brand_id"
              label="Select Brand"
              options={brandsData}
            />
          )}
          <SelectInput
            param="status"
            label="Select Status"
            options={ComplaintStatusOptions}
          />
        </TableFacedFilter>
      }
      Create={<CreateComplaint />}
    />
  );
}
