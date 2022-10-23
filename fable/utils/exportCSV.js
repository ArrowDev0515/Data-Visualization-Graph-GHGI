import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

const fName = "demo";
const sampleData = [
  {
    "First Name": "Kal",
    "Last Name": "Iverson",
    "Birthday": "1990-4-12",
    "Address": "United States",
  },
  {
    "First Name": "Kal",
    "Last Name": "Libeck",
    "Birthday": "1992-4-22",
    "Address": "Canada",
  },
  {
    "First Name": "taylor",
    "Last Name": "lucas",
    "Birthday": "1991-11-14",
    "Address": "France",
  },
]

export const exportToCSV = (csvData, fileName) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  const ws = XLSX.utils.json_to_sheet(csvData);
  const wb = { Sheets: {'data': ws}, SheetNames: ['data']};
  const excelBuffer = XLSX.write(wb, {bookType: 'xlsx', type: 'array'});
  const data = new Blob([excelBuffer], {type: fileType});
  FileSaver.saveAs(data, fileName + fileExtension);
}