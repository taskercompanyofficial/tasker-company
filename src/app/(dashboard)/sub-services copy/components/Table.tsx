"use client";
import TableFacedFilter from "@/components/base/tableComponents/table-faced-filter";
import { DataTable } from "@/components/base/table";
import SelectInput from "@/components/base/tableComponents/filters/select-input";
import { statusOptions } from "@/lib/otpions";
import SearchInput from "@/components/base/tableComponents/filters/search-input";
import Create from "../create/Create";
import { ServicesCoulmns } from "@/TableColumns/Services-columns";
import { dataTypeIds } from "@/types";
import useFetch from "@/hooks/usefetch";
import { API_URL } from "@/lib/apiEndPoints";
import { Skeleton } from "@/components/ui/skeleton";

export default function Table({
  endPoint,
  data,
}: {
  endPoint: string;
  data: any;
}) {
  const { data: servicesids, isLoading: servicesLoading } = useFetch<
    dataTypeIds[]
  >(`${API_URL}/fetch-services-ids`);
  return (
    <DataTable
      data={data.data}
      endPoint={endPoint}
      columns={ServicesCoulmns()}
      pagination={data.pagination}
      FacedFilter={
        <TableFacedFilter>
          <SearchInput />
          <SelectInput
            param="status"
            label="Select Status"
            options={statusOptions}
          />
          {!servicesLoading && servicesids ? (
            <SelectInput
              param="service_id"
              label="Select service"
              options={servicesids}
            />
          ) : (
            <Skeleton className="h-10 w-[200px]" />
          )}
        </TableFacedFilter>
      }
      Create={<Create />}
    />
  );
}
