"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";
import { Download } from "lucide-react";
import { cn } from "@/lib/utils";
import { ExcelDownload } from "./data-table/excel-download";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const DownloadButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentProps<any>
>(({ className, onClick, onClickDownloadRows, ...props }, ref) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          ref={ref}
          data-sidebar="trigger"
          variant="ghost"
          size="icon"
          className={cn("h-7 w-7", className)}
          onClick={(event) => {
            onClick?.(event);
          }}
          {...props}
        >
          <Download />
          <span className="sr-only">Download button</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <DropdownMenuItem
          onClick={(event) => {
            onClickDownloadRows?.(event);
          }}
        >
          Last ned markerte rader
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
});
