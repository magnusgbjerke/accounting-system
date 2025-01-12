"use client";

import MyForm from "./form";

export default function Page() {
  return (
    <>
      <div className="p-2">
        <h1 className="text-3xl text-center underline">Bokføring</h1>
        <div className="max-w-4xl mx-auto mt-4">
          <MyForm/>
        </div>
      </div>
    </>
  );
}
