import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ComplaintsType } from "@/types";
import { formatDate } from "@/lib/utils";
import { DataTableColumnHeader } from "@/components/base/tableComponents/data-table-column-header";
import Status from "@/components/base/tableComponents/status";
import { ComplaintsDropdown } from "@/TableDropdowns/complaints-dropdown"; // Changed to named import
import Link from "next/link";
import { Textarea } from "@/components/ui/textarea";
import ReadMore from "@/components/readmore";

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
    cell: ({ row }) => {
      const complaint_num = row.getValue("complain_num") as string;
      const id = row.getValue("id") as number;
      return (
        <Link
          href={`/authenticated/complaints/${id}`}
          className="underline"
          target="_blank"
        >
          {complaint_num}
        </Link>
      );
    },
  },
  {
    accessorKey: "applicant_name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Applicant Name" />
    ),
  },
  {
    accessorKey: "brand_complaint_no",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand Complaint No" />
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
    cell: ({ row }) => {
      const applicant_adress = row.getValue("applicant_adress") as string;
      return <ReadMore text={applicant_adress} />;
    }
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" />
    ),
    cell: ({ row }) => {
      const description = row.getValue("description") as string;
      return <ReadMore text={description} />;
    }
  },
  {
    accessorKey: "brand_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Brand" />
    ),
  },
  {
    accessorKey: "branch_id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Branch" />
    ),
  },
  {
    accessorKey: "extra_numbers",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extra Numbers" />
    ),
  },
  {
    accessorKey: "reference_by",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Reference By" />
    ),
  },
  {
    accessorKey: "product",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product" />
    ),
  },
  {
    accessorKey: "model",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Model" />
    ),
  },
  {
    accessorKey: "serial_number_ind",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serial Number (IND)" />
    ),
  },
  {
    accessorKey: "serial_number_oud",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Serial Number (OUD)" />
    ),
  },
  {
    accessorKey: "mq_nmb",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="MQ Number" />
    ),
  },
  {
    accessorKey: "product_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Type" />
    ),
  },
  {
    accessorKey: "p_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Purchase Date" />
    ),
    cell: ({ cell }) => formatDate(cell.getValue() as Date),
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Amount" />
    ),
  },
  {
    accessorKey: "complaint_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Complaint Type" />
    ),
  },
  {
    accessorKey: "provided_services",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Provided Services" />
    ),
  },
  {
    accessorKey: "warranty_type",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Warranty Type" />
    ),
  },
  {
    accessorKey: "extra_note",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Extra Note" />
    ),
    cell: ({ row }) => {
      const extra_note = row.getValue("extra_note") as string;
      return <ReadMore text={extra_note} />;
    }
  },
  {
    accessorKey: "happy_call_remarks",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Happy Call Remarks" />
    ),
    cell: ({ row }) => {
      const happy_call_remarks = row.getValue("happy_call_remarks") as string;
      return <ReadMore text={happy_call_remarks} />;
    }
  }, {
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
