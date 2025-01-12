"use client";

import { DatePicker } from "@/components/datePicker";
import { Input } from "@/components/ui/input";
import { createVouchers, fetchAccounts, fetchVouchers } from "@/lib/data";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { components } from "../../../lib/schema";
import { Book, ChevronRight, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Choice, Combobox } from "@/components/combobox";

type VoucherRequest = components["schemas"]["VoucherRequest"];

const MyComponent = () => {
  const [accounts, setAccounts] = useState<any>([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const data2 = await fetchAccounts();
        setAccounts(data2);
      } catch (error: any) {
        return [];
      }
    }
    fetchData();
  }, []);

  let choices: Array<Choice> = [];
  accounts?.forEach((x, index) => {
    let choice: Choice = {
      value: `${accounts[index]?.nr}`,
      label: `${accounts[index]?.nr} ${accounts[index]?.name}`,
    };
    choices.push(choice);
  });

  const dateConverter = (currentDate1: Date) => {
    const currentDate = new Date(currentDate1);
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, "0");
    const day = String(currentDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;
    return formattedDate;
  };

  const { control, handleSubmit } = useForm({
    defaultValues: {
      forms: [
        {
          nr: "",
          date: Date(),
          accountDebet: "",
          accountKredit: "",
          amount: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "forms",
  });

  const onSubmit = async (data: any) => {
    console.log(data);
    const dataForms = data.forms;
    let arr: VoucherRequest[] | undefined = [];
    for (let index = 0; index < dataForms.length; index++) {
      let accountValue = 0;
      let amountValue = 0;
      let onlyDate = dateConverter(dataForms[index].date);
      if (
        dataForms[index].accountDebet !== "" &&
        dataForms[index].accountKredit === ""
      ) {
        accountValue = +dataForms[index].accountDebet;
        amountValue = +dataForms[index].amount;
      }
      if (
        dataForms[index].accountDebet === "" &&
        dataForms[index].accountKredit !== ""
      ) {
        accountValue = +dataForms[index].accountKredit;
        amountValue = -dataForms[index].amount;
      }
      if (
        dataForms[index].accountDebet !== "" &&
        dataForms[index].accountKredit !== ""
      ) {
        let obj1: VoucherRequest = {
          nr: +dataForms[index].nr,
          date: onlyDate,
          account: +dataForms[index].accountDebet,
          amount: +dataForms[index].amount,
        };
        let obj2: VoucherRequest = {
          nr: +dataForms[index].nr,
          date: onlyDate,
          account: +dataForms[index].accountKredit,
          amount: -dataForms[index].amount,
        };
        arr.push(obj1);
        arr.push(obj2);
        continue;
      }
      let obj: VoucherRequest = {
        nr: +dataForms[index].nr,
        date: onlyDate,
        account: accountValue,
        amount: amountValue,
      };
      arr.push(obj);
    }
    createVouchers(arr);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <table className="border-collapse">
        <thead>
          <tr>
            <th className="border-2 border-solid p-2">Bilagsnr</th>
            <th className="border-2 border-solid">Dato</th>
            <th className="border-2 border-solid">Debet</th>
            <th className="border-2 border-solid">Kredit</th>
            <th className="border-2 border-solid">Beløp</th>
            <th className="border-2 border-solid"> </th>
          </tr>
        </thead>
        <tbody>
          {fields.map((item, index) => (
            <tr key={item.id}>
              <td className="border-2 border-solid">
                <Controller
                  name={`forms.${index}.nr`}
                  control={control}
                  defaultValue={item.nr}
                  render={({ field }) => (
                    <Input
                      className="border-0"
                      {...field}
                      placeholder="nr"
                      autoComplete="off"
                    />
                  )}
                />
              </td>
              <td className="border-2 border-solid">
                <Controller
                  name={`forms.${index}.date`}
                  control={control}
                  defaultValue={item.date}
                  render={({ field }) => (
                    <DatePicker
                      {...field}
                      selected={field.value}
                      onSelect={(date: Date) => field.onChange(date)}
                    />
                  )}
                />
              </td>
              <td className="border-2 border-solid">
                <Controller
                  name={`forms.${index}.accountDebet`}
                  control={control}
                  defaultValue={item.accountDebet}
                  render={({ field }) => (
                    <Combobox
                      choices={choices}
                      setChoiceValue={(accountDebet: string) =>
                        field.onChange(accountDebet)
                      }
                    />
                  )}
                />
              </td>
              <td className="border-2 border-solid">
                <Controller
                  name={`forms.${index}.accountKredit`}
                  control={control}
                  defaultValue={item.accountKredit}
                  render={({ field }) => (
                    <Combobox
                      choices={choices}
                      setChoiceValue={(accountKredit: string) =>
                        field.onChange(accountKredit)
                      }
                    />
                  )}
                />
              </td>
              <td className="border-2 border-solid">
                <Controller
                  name={`forms.${index}.amount`}
                  control={control}
                  defaultValue={item.amount}
                  render={({ field }) => (
                    <Input
                      type="number"
                      {...field}
                      placeholder="beløp"
                      autoComplete="off"
                      className="border-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  )}
                />
              </td>
              <td className="border-2 border-solid">
                <Button
                  className="border-0"
                  variant="outline"
                  size="icon"
                  type="button"
                  onClick={() => {
                    if (index > 0) {
                      remove(index);
                    }
                  }}
                >
                  <X />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Button
        type="button"
        className="w-full mt-1"
        onClick={() => {
          append({
            nr: "",
            date: Date(),
            accountDebet: "",
            accountKredit: "",
            amount: "",
          });
        }}
        variant="outline"
      >
        <ChevronRight />
        Legg til rad
      </Button>
      <br />
      <Button type="submit" className="mt-2" variant="outline">
        Bokfør
        <Book />
      </Button>
    </form>
  );
};

export default MyComponent;
