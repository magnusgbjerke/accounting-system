"use client";

import { columns } from "@/components/data-table/components/columns";
import { DataTable } from "@/components/data-table/components/data-table";
import { fetchVouchers } from "@/lib/data";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data2 = await fetchVouchers();
        setData(data2);
      } catch (error: any) {
        return [];
      }
    }
    fetchData();
  }, []);

  return (
    <div className="p-2">
      <h1 className="text-3xl text-center underline">Hovedbok</h1>
      <div className="max-w-2xl mx-auto mt-4">
        <DataTable data={data} columns={columns} />
      </div>
    </div>
  );
}
