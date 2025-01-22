import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { formatDate } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/base/tableComponents/data-table-column-header";
import Status from "@/components/base/tableComponents/status";
import { AttendanceType } from "@/types";
import AttendanceDropdown from "@/TableDropdowns/Attendance-dropdown";

export const AttendanceColumns = (): ColumnDef<AttendanceType>[] => [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="ID" />
    ),
  },
  {
    accessorKey: "employee_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Employee Name" />
    ),
  },
  {
    accessorKey: "check_in",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check In" />
    ),
    cell: ({ cell }) =>
      formatDate(cell.getValue() as Date, {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "check_in_location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check In Location" />
    ),
  },
  {
    accessorKey: "check_out",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check Out" />
    ),
    cell: ({ cell }) =>
      formatDate(cell.getValue() as Date, {
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "check_out_location",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Check Out Location" />
    ),
  },
  {
    accessorKey: "total_hours",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total Hours" />
    ),
    cell: ({ cell }) => {
      const totalHours = cell.getValue() as number;
      return <span>{totalHours.toFixed(2)}</span>;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = String(row.getValue("status"));
      return <Status status={status} />;
    },
  },    
  {
    id: "actions",
    cell: ({ row }) => {
      const rowCurrent = row.original;
      return (
        <>
          <AttendanceDropdown rowCurrent={rowCurrent} />
        </>
      );
    },
  },
];
