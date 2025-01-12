"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  FilterFn,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useEffect } from "react";
import { useDataTableStore } from "../stores/DataTableStore";

import {
  RankingInfo,
  rankItem,
  compareItems,
} from "@tanstack/match-sorter-utils";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

declare module "@tanstack/react-table" {
  //add fuzzy filter to the filterFns
  interface FilterFns {
    fuzzy: FilterFn<unknown>;
  }
  interface FilterMeta {
    itemRank: RankingInfo;
  }
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState({});
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [sorting, setSorting] = React.useState<SortingState>([]);

  const {
    allOrSomeRowsSelected,
    setAllOrSomeRowsSelected,
    currentSelectedVouchers,
    setCurrentSelectedVouchers,
  } = useDataTableStore();

  const fuzzyFilter: FilterFn<any> = (row, columnId, value, addMeta) => {
    const itemRank = rankItem(row.getValue(columnId), value);
    addMeta({
      itemRank,
    });

    return itemRank.passed;
  };

  const table = useReactTable({
    data,
    columns,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
      globalFilter,
    },

    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: "fuzzy",
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  async function updateSelected(
    getIsAllPageRowsSelected: boolean,
    getIsSomePageRowsSelected: boolean
  ) {
    getIsAllPageRowsSelected || getIsSomePageRowsSelected
      ? setAllOrSomeRowsSelected(true)
      : setAllOrSomeRowsSelected(false);
  }

  async function makeArr() {
    let currentSelectedVouchersByIndex = table.getState().rowSelection;
    const arr: any = [];
    for (const index in currentSelectedVouchersByIndex) {
      arr.push(data[index]);
    }
    setCurrentSelectedVouchers(arr);
  }

  useEffect(() => {
    updateSelected(
      table.getIsAllPageRowsSelected(),
      table.getIsSomePageRowsSelected()
    );
    makeArr();
  }, [rowSelection]);

  return (
    <div className="space-y-4">
      <DataTableToolbar table={table} />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Ingen resultater.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
