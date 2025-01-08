"use client";
import TableFacedFilter from "@/components/base/tableComponents/table-faced-filter";
import { DataTable } from "@/components/base/table";
import SelectInput from "@/components/base/tableComponents/filters/select-input";
import { getRoleOptions, statusOptions } from "@/lib/otpions";
import SearchInput from "@/components/base/tableComponents/filters/search-input";
import Create from "../create/Create";
import { WorkersCoulmns } from "@/TableColumns/worker-column";

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
      columns={WorkersCoulmns()}
      pagination={data.pagination}
      FacedFilter={
        <TableFacedFilter>
          <SearchInput />
          <SelectInput
            param="status"
            label="Select Status"
            options={statusOptions}
          />
          <SelectInput
            param="role"
            label="Select Role"
            options={getRoleOptions}
          />
        </TableFacedFilter>
      }
      Create={<Create />}
    />
  );
}
