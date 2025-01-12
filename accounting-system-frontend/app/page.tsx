"use client";

import { redirect } from "next/navigation";

export default function Page() {
  redirect("/accounting/voucherRegistration");
  return <p>Dashbord</p>;
}
