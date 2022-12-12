import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
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

const readmeData = [
  { "": "Online Mitigation Option" },
  { "": "" },
  { "": "1. Overview"},
  { "": "Data used:"},
  { "": "UNFCCC GHG Data Interface: https://di.unfccc.int/flex_non_annex1"},
  { "": "Climate Watch Historical GHG Emissions. 2022. Washington, DC: World Resources Institute. Available online at: https://www.climatewatchdata.org/ghg-emissions"},
  { "": "FAO, 2022. FAOSTAT Climate Change, Emissions, Emissions Totals, http://www.fao.org/faostat/en/#data/GT"},
  { "": "" },
  { "": "2. Mitigation Reduction Potential"},
  { "": "Data used:"},
  { "": "" },
  { "": "" },
  { "": "3. Trade-offs and Synergies"},
  { "": "" },
  { "": "" },
  { "": "" },
  { "": "Citation"}
];

export const exportToCSV = (csvData, fileName) => {
  const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension = '.xlsx';

  // var reader = new FileReader();
  // reader.onload = function (e) {
  //   var data = new Uint8Array(e.target.result);
  //   var workbook = XLSX.read(data, { type: "array" });
  //   var firstSheet = workbook.SheetNames[0];
  //   setIsReading(false);
  //   const elements = XLSX.utils.sheet_to_json(workbook.Sheets[firstSheet]);
  //   console.log("Excel read OK!", elements);
  //   console.log("Found " + elements.length + " elements");
  //   console.log("JSON size", JSON.stringify(elements).length, "bytes");
  // };
  // reader.readAsArrayBuffer(file);

  const ws = XLSX.utils.json_to_sheet(csvData);
  const ws2 = XLSX.utils.json_to_sheet(readmeData);

  const wb = { Sheets: { 'Data': ws, "Read Me": ws2 }, SheetNames: ['Read Me', 'Data'] };
  const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
  const data = new Blob([excelBuffer], { type: fileType });
  FileSaver.saveAs(data, fileName + fileExtension);
}