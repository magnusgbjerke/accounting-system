"use client";

import ExcelJS from "exceljs";

const dateConverter = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, "0");
  const day = String(currentDate.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  return formattedDate;
};

export async function ExcelDownload(arr: Array<any>) {

  const workbook = new ExcelJS.Workbook();

  const worksheet = workbook.addWorksheet("Sheet 1");

  worksheet.columns = [
    { header: "Bilagsnr", key: "nrKey", width: 20 },
    {
      header: "Dato",
      key: "dateKey",
      width: 20,
      style: { numFmt: "yyyy-mm-dd" },
    },
    { header: "Konto", key: "accountKey", width: 20 },
    { header: "Beløp", key: "amountKey", width: 20 },
  ];

  arr.forEach((x, index) => {
    worksheet.addRow({
      nrKey: x["nr"],
      dateKey: new Date(x["date"]),
      accountKey: x["account"],
      amountKey: x["amount"],
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();

  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });

  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  const nameOfFile = `selskap1-hovedbok-${dateConverter()}`;
  link.download = `${nameOfFile}.xlsx`;
  link.click();
}
