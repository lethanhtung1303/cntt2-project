import * as FileSaver from "file-saver";

export function saveAsExcelFile(buffer: any, fileName: string): void {
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
