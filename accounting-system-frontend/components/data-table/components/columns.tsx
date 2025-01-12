"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "./data-table-column-header";
import { components } from "@/lib/schema";
type VoucherResponse = components["schemas"]["VoucherResponse"];

const amountConverter = (value: number) => {
  const [integer, decimal] = value.toString().split(".");
  return decimal ? `${integer},${decimal}` : integer;
};

const dateConverter = (value: number) => {
  const [yyyy, mm, dd] = value.toString().split("-");
  return `${dd}.${mm}.${yyyy}`;
};

export const columns: ColumnDef<VoucherResponse>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(!!value);
        }}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(!!value);
        }}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "nr",
    filterFn: "equalsString", //note: normal non-fuzzy filter column - exact match required
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Bilagsnr" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("nr")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Dato" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {dateConverter(row.getValue("date"))}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "account",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Konto" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("account")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Beløp" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {amountConverter(row.getValue("amount"))}
          </span>
        </div>
      );
    },
  },
];
