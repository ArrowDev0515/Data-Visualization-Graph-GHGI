import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
const readmeData = require("../consts/221212_Readme.json")


export const exportToCSV = (csvData, fileName) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const ws = XLSX.utils.json_to_sheet(csvData);
  const ws2 = XLSX.utils.json_to_sheet(readmeData);

  const wb = { Sheets: { 'Data': ws, "Read Me": ws2 }, SheetNames: ['Read Me', 'Data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
}