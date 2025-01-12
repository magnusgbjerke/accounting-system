"use client";

import { toast } from "sonner";
import { getPath } from "./getPath";
import axios from "axios";
import { components } from "./schema";

type Account = components["schemas"]["Account"];
type VoucherResponse = components["schemas"]["VoucherResponse"];
type VoucherRequest = components["schemas"]["VoucherRequest"];

export async function fetchVouchers(): Promise<VoucherResponse[] | undefined> {
  const url = getPath("/api/voucher");
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    return [];
  }
}

export async function fetchAccounts(): Promise<Account[] | undefined> {
  const url = getPath("/api/account");
  try {
    let response = await axios.get(url);
    return response.data;
  } catch (error: any) {
    return [];
  }
}

export async function createVouchers(data: VoucherRequest[] | undefined) {
  const url = getPath("/api/voucher");
  try {
    let response = await axios.post(url, data);
    if (response.status === 201) {
      toast.success("Bokført");
    }
  } catch (error: any) {
    toast.error(error.response.data.message);
    return [];
  }
}
