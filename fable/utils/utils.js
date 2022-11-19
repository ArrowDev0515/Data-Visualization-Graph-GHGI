const dataSrc = require("../consts/221118_HomePage.json");
const consts = require("../consts/consts");


export const test = (country, year, dataSource, gwp) => {
  let data = dataSrc.filter((ele) => {
    return (ele["Party"].toString() === country && parseInt(ele["Year"]) === parseInt(year) && ele["DataSource"] === dataSource && ele["AR"] === gwp);
  });
  console.log(data);
}

export const formatCountryListFromJSON = () => {
  let str = [];
  dataSrc.map((ele) => {
    if (!str.includes(ele["Party"])) {
      str.push(ele["Party"]);
    }
  });
  str = str.sort((a, b) => {
    if (a > b)
      return 1;
    else return -1;
  })
  console.log(str.toString())
}