"use client";
import TableFacedFilter from "@/components/base/tableComponents/table-faced-filter";
import { DataTable } from "@/components/base/table";
import SelectInput from "@/components/base/tableComponents/filters/select-input";
import { statusOptions } from "@/lib/otpions";
import SearchInput from "@/components/base/tableComponents/filters/search-input";
import { ComplaintsColumns } from "@/TableColumns/complaints-columns";
import CreateComplaint from "../create/create";

export default function Table({
  endPoint,
  data,
}: {
  endPoint: string;
  data: any;
}) {
  return (
    <DataTable
      data={data.data}
      endPoint={endPoint}
      columns={ComplaintsColumns()}
      pagination={data.pagination}
      FacedFilter={
        <TableFacedFilter>
          <SearchInput />
          <SelectInput
            param="status"
            label="Select Status"
            options={statusOptions}
          />
        </TableFacedFilter>
      }
      Create={<CreateComplaint />}
    />
  );
}
