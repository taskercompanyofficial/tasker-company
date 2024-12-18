import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { CategoriesType } from "@/types";
import { formatDate, getImageUrl } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/base/tableComponents/data-table-column-header";
import { Progress } from "@/components/ui/progress";
import Status from "@/components/base/tableComponents/status";
import CategoriesDropdown from "@/TableDropdowns/Categories-dropdown";
import ProfilePic from "@/components/ui/profile_pic";

export const CategoriesColumns = (): ColumnDef<CategoriesType>[] => [
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
    accessorKey: "image",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Image" />
    ),
    cell: ({ row }) => {
      const image = String(row.getValue("image"));
      return <ProfilePic path={getImageUrl(image)} />;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Category Name" />
    ),
  },
  {
    accessorKey: "open",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Open Complaints" />
    ),
  },
  {
    accessorKey: "closed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Closed In Today" />
    ),
  },
  {
    accessorKey: "others",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Other Complaints" />
    ),
  },
  {
    accessorKey: "progress",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Progress" />
    ),
    cell: ({ row }) => {
      // Ensure progress is a number
      const progress = Number(row.getValue("progress")) || 0;

      return <Progress value={progress} />;
    },
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
          <CategoriesDropdown rowCurrent={rowCurrent} />
        </>
      );
    },
  },
];
