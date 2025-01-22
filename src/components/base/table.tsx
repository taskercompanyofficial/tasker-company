"use client";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  useReactTable,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  VisibilityState,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { DataTablePagination } from "../common/Pagination";
import { DataTableViewOptions } from "../common/columnToggle";
import Status from "./tableComponents/status";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pagination: any;
  endPoint: string;
  FacedFilter?: any;
  Create?: any;
}

export function DataTable<
  TData extends { status?: string; actions?: React.ReactNode },
>({
  columns,
  data,
  pagination,
  endPoint,
  FacedFilter,
  Create,
}: DataTableProps<TData, any>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="flex min-h-screen flex-col space-y-4">
      {/* Table Controls */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex-1">{FacedFilter}</div>
        <div className="flex items-center gap-2">
          {Create}
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Table Container */}
      <div className="relative overflow-hidden rounded-md border bg-white shadow-sm dark:bg-gray-900">
        <div className="overflow-x-auto">
          <Table className="w-full">
            {/* Header */}
            <TableHeader className="sticky top-0 z-10">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    if (header.column.id === "status") {
                      return (
                        <TableHead
                          key={header.id}
                          className="sticky right-[48px] z-20"
                          style={{
                            right: "var(--action-column-width, 48px)",
                          }}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    }
                    if (header.column.id === "actions") {
                      return (
                        <TableHead
                          key={header.id}
                          className="sticky right-0 z-20"
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      );
                    }
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>

            {/* Body */}
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell, index) => {
                      if (cell.column.id === "status") {
                        return (
                          <TableCell
                            key={cell.id}
                            className="sticky right-[48px] z-20 bg-white"
                            style={{
                              right: "var(--action-column-width, 48px)",
                            }}
                          >
                            {row.original.status && (
                              <Status status={row.original.status} />
                            )}
                          </TableCell>
                        );
                      }
                      if (cell.column.id === "actions") {
                        return (
                          <TableCell
                            key={cell.id}
                            className="sticky right-0 z-20 bg-white"
                          >
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </TableCell>
                        );
                      }
                      return (
                        <TableCell key={cell.id}>
                          <div className="overflow-hidden">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </div>
                        </TableCell>
                      );
                    })}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination */}
      <div className="sticky bottom-0 bg-white py-4 dark:bg-gray-900">
        <DataTablePagination
          table={table}
          pagination={pagination}
          endPoint={endPoint}
        />
      </div>
    </div>
  );
}
