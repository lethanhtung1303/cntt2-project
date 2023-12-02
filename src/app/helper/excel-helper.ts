import * as FileSaver from "file-saver";

export function helperExportExcel(data: any, name: string) {
  console.log(data)
  import('xlsx').then((xlsx) => {
    const worksheet = xlsx.utils.json_to_sheet(data);
    const workbook = {Sheets: {data: worksheet}, SheetNames: [name]};
    const excelBuffer: any = xlsx.write(workbook, {
      bookType: 'xlsx',
      type: 'array',
    });
    saveAsExcelFile(excelBuffer, name);
  }).catch((error) => {
    console.log(error)
  });
}

function saveAsExcelFile(buffer: any, fileName: string): void {
  let EXCEL_TYPE =
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  let EXCEL_EXTENSION = '.xlsx';
  const data: Blob = new Blob([buffer], {
    type: EXCEL_TYPE,
  });
  FileSaver.saveAs(
    data,
    fileName +
    '_' +
    new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[-T:]/g, '')
      .replace('.', '') +
    EXCEL_EXTENSION
  );
}
