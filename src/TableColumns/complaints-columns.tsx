import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ComplaintsType } from "@/types";
import { formatDate, getImageUrl } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/base/tableComponents/data-table-column-header";
import Status from "@/components/base/tableComponents/status";
import CategoriesDropdown from "@/TableDropdowns/Categories-dropdown";
import ComplaintsDropdown from "@/TableDropdowns/complaints-dropdown";
import Link from "next/link";

export const ComplaintsColumns = (): ColumnDef<ComplaintsType>[] => [
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
    accessorKey: "complain_num",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Complaint Number" />
    ),
    cell: ({ cell }) => {
      const complaint_num = cell.getValue() as string;
      return (
        <Link
          href={`/complaints/${complaint_num}`}
          className="underline"
          target="_blank"
        >
          {complaint_num}
        </Link>
      );
    },
  },
  {
    accessorKey: "complaint_heading",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Complaint Heading" />
    ),
  },
  {
    accessorKey: "applicant_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant Name" />
    ),
  },
  {
    accessorKey: "applicant_email",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant Email" />
    ),
  },
  {
    accessorKey: "applicant_phone",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant Phone" />
    ),
  },
  {
    accessorKey: "applicant_whatsapp",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant Whatsapp" />
    ),
  },
  {
    accessorKey: "applicant_adress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant Address" />
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created At" />
    ),
    cell: ({ cell }) => formatDate(cell.getValue() as Date),
  },
  {
    accessorKey: "updated_at",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Updated At" />
    ),
    cell: ({ cell }) => formatDate(cell.getValue() as Date),
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
          <ComplaintsDropdown rowCurrent={rowCurrent} />
        </>
      );
    },
  },
];
