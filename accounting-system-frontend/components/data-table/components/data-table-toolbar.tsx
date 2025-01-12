"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { toast } from "sonner";
import { useDataTableStore } from "../stores/DataTableStore";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const {
    allOrSomeRowsSelected,
    setAllOrSomeRowsSelected,
    currentSelectedVouchers,
    setCurrentSelectedVouchers,
  } = useDataTableStore();

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filtrer etter bilagsnr..."
          value={(table.getColumn("nr")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>{table.getColumn("nr")?.setFilterValue(event.target.value);}
            
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
